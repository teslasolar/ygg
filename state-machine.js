/**
 * Yggdrasil State Machine & Error Logger
 * Manages page lifecycle, error handling, and GitHub Pages compatibility
 */

class YggdrasilStateMachine {
    constructor(pageName) {
        this.pageName = pageName;
        this.currentState = 'UNINITIALIZED';
        this.states = {
            UNINITIALIZED: { next: ['LOADING'] },
            LOADING: { next: ['CHECKING_DEPS', 'ERROR'] },
            CHECKING_DEPS: { next: ['INITIALIZING', 'FALLBACK', 'ERROR'] },
            INITIALIZING: { next: ['READY', 'ERROR'] },
            FALLBACK: { next: ['READY', 'ERROR'] },
            READY: { next: ['RUNNING', 'ERROR'] },
            RUNNING: { next: ['PAUSED', 'ERROR'] },
            PAUSED: { next: ['RUNNING', 'ERROR'] },
            ERROR: { next: ['LOADING', 'FALLBACK'] }
        };

        this.errors = [];
        this.warnings = [];
        this.logs = [];
        this.startTime = Date.now();
        this.metrics = {
            stateTransitions: 0,
            errorCount: 0,
            warningCount: 0,
            recoveryAttempts: 0
        };

        this.stateHandlers = new Map();
        this.errorHandlers = new Map();

        // GitHub Pages detection
        this.isGitHubPages = this.detectGitHubPages();

        this.init();
    }

    init() {
        this.log('info', `🚀 Initializing ${this.pageName}`);
        this.log('info', `Environment: ${this.isGitHubPages ? 'GitHub Pages' : 'Local'}`);

        // Set up global error handler
        window.addEventListener('error', (event) => {
            this.handleGlobalError(event);
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.handleUnhandledRejection(event);
        });

        this.transition('LOADING');
    }

    detectGitHubPages() {
        const hostname = window.location.hostname;
        return hostname.includes('github.io') || hostname.includes('github.com');
    }

    transition(newState, data = {}) {
        const validTransitions = this.states[this.currentState]?.next || [];

        if (!validTransitions.includes(newState)) {
            this.log('warning', `Invalid transition: ${this.currentState} -> ${newState}`);

            // Allow transition anyway with warning
            if (this.currentState === 'ERROR' && newState === 'LOADING') {
                // Recovery allowed
                this.metrics.recoveryAttempts++;
            }
        }

        const oldState = this.currentState;
        this.currentState = newState;
        this.metrics.stateTransitions++;

        this.log('info', `State: ${oldState} → ${newState}`, data);

        // Call registered state handler
        const handler = this.stateHandlers.get(newState);
        if (handler) {
            try {
                handler(data);
            } catch (error) {
                this.log('error', `State handler error in ${newState}:`, error);
                this.transition('ERROR', { from: newState, error });
            }
        }

        // Emit custom event
        this.emit('stateChange', { from: oldState, to: newState, data });
    }

    onState(state, handler) {
        this.stateHandlers.set(state, handler);
    }

    onError(errorType, handler) {
        this.errorHandlers.set(errorType, handler);
    }

    log(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const elapsed = ((Date.now() - this.startTime) / 1000).toFixed(2);

        const logEntry = {
            timestamp,
            elapsed: `${elapsed}s`,
            level,
            page: this.pageName,
            state: this.currentState,
            message,
            data
        };

        this.logs.push(logEntry);

        // Console output with colors
        const emoji = {
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            success: '✅',
            debug: '🔍'
        }[level] || '📝';

        const style = {
            error: 'color: #ff4444; font-weight: bold',
            warning: 'color: #ffaa00',
            info: 'color: #00aaff',
            success: 'color: #44ff44',
            debug: 'color: #888'
        }[level] || '';

        console.log(
            `%c${emoji} [${this.pageName}:${this.currentState}] ${message}`,
            style,
            data || ''
        );

        // Track errors and warnings
        if (level === 'error') {
            this.errors.push(logEntry);
            this.metrics.errorCount++;
        } else if (level === 'warning') {
            this.warnings.push(logEntry);
            this.metrics.warningCount++;
        }

        // Display in UI if console exists
        this.updateUILog(logEntry, emoji);

        // Keep only last 100 logs
        if (this.logs.length > 100) {
            this.logs.shift();
        }
    }

    updateUILog(logEntry, emoji) {
        const logConsole = document.getElementById('logConsole');
        if (logConsole) {
            const entry = document.createElement('div');
            entry.className = `log-entry log-${logEntry.level}`;
            entry.textContent = `[${logEntry.elapsed}] ${emoji} ${logEntry.message}`;

            logConsole.appendChild(entry);
            logConsole.scrollTop = logConsole.scrollHeight;

            // Keep only last 50 entries
            while (logConsole.children.length > 50) {
                logConsole.removeChild(logConsole.firstChild);
            }
        }
    }

    handleGlobalError(event) {
        this.log('error', 'Uncaught error:', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            error: event.error?.stack
        });

        // Try to recover
        if (this.currentState !== 'ERROR') {
            this.transition('ERROR', {
                type: 'uncaught',
                error: event.error
            });
        }

        // Check for specific errors
        if (event.message.includes('THREE')) {
            this.log('warning', 'Three.js error detected, attempting fallback');
            this.emit('three-error', event);
        }

        return false; // Let browser handle it too
    }

    handleUnhandledRejection(event) {
        this.log('error', 'Unhandled promise rejection:', {
            reason: event.reason,
            promise: event.promise
        });

        if (this.currentState !== 'ERROR') {
            this.transition('ERROR', {
                type: 'promise-rejection',
                reason: event.reason
            });
        }
    }

    async checkDependencies() {
        this.transition('CHECKING_DEPS');
        this.log('info', 'Checking dependencies...');

        const deps = {
            THREE: typeof THREE !== 'undefined',
            worldtree: typeof WorldTree !== 'undefined' && typeof Forest !== 'undefined',
            canvas: !!document.getElementById('canvas3d'),
            dom: document.readyState === 'complete'
        };

        this.log('debug', 'Dependencies:', deps);

        const missing = Object.entries(deps)
            .filter(([_, exists]) => !exists)
            .map(([name]) => name);

        if (missing.length > 0) {
            this.log('warning', `Missing dependencies: ${missing.join(', ')}`);

            // Special handling for Three.js
            if (missing.includes('THREE')) {
                this.log('info', 'Three.js not available, will use 2D fallback');
                return 'FALLBACK';
            }

            // Critical dependencies
            if (missing.includes('worldtree')) {
                this.log('error', 'WorldTree core missing - cannot continue');
                this.transition('ERROR', { missing });
                return 'ERROR';
            }
        }

        return missing.includes('THREE') ? 'FALLBACK' : 'INITIALIZING';
    }

    async initialize(initFn) {
        try {
            const nextState = await this.checkDependencies();
            this.transition(nextState);

            if (nextState === 'ERROR') {
                throw new Error('Dependency check failed');
            }

            this.log('info', 'Running initialization...');
            await initFn();

            this.transition('READY');
            this.log('success', `${this.pageName} ready!`);

            return true;
        } catch (error) {
            this.log('error', 'Initialization failed:', error);
            this.transition('ERROR', { error });
            return false;
        }
    }

    async retry(fn, maxAttempts = 3, delay = 1000) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                this.log('info', `Attempt ${attempt}/${maxAttempts}...`);
                const result = await fn();
                this.log('success', `Success on attempt ${attempt}`);
                return result;
            } catch (error) {
                this.log('warning', `Attempt ${attempt} failed:`, error.message);

                if (attempt < maxAttempts) {
                    this.log('info', `Retrying in ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2; // Exponential backoff
                } else {
                    this.log('error', 'All retry attempts failed');
                    throw error;
                }
            }
        }
    }

    emit(eventName, data) {
        const event = new CustomEvent(`ygg:${eventName}`, {
            detail: {
                page: this.pageName,
                state: this.currentState,
                ...data
            }
        });
        window.dispatchEvent(event);
    }

    on(eventName, handler) {
        window.addEventListener(`ygg:${eventName}`, (e) => handler(e.detail));
    }

    getMetrics() {
        return {
            ...this.metrics,
            uptime: ((Date.now() - this.startTime) / 1000).toFixed(2) + 's',
            currentState: this.currentState,
            errorRate: (this.metrics.errorCount / this.metrics.stateTransitions * 100).toFixed(1) + '%'
        };
    }

    exportLogs() {
        const data = {
            page: this.pageName,
            environment: this.isGitHubPages ? 'GitHub Pages' : 'Local',
            startTime: new Date(this.startTime).toISOString(),
            currentState: this.currentState,
            metrics: this.getMetrics(),
            errors: this.errors,
            warnings: this.warnings,
            logs: this.logs
        };

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `yggdrasil-${this.pageName}-logs-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.log('success', 'Logs exported');
    }

    displayErrorReport() {
        if (this.errors.length === 0) {
            this.log('success', 'No errors to report!');
            return;
        }

        console.group(`🔴 Error Report for ${this.pageName}`);
        console.log(`Total Errors: ${this.errors.length}`);
        console.log(`Total Warnings: ${this.warnings.length}`);
        console.table(this.errors.map(e => ({
            time: e.elapsed,
            state: e.state,
            message: e.message
        })));
        console.groupEnd();

        // Display in UI
        const report = this.errors.map(e =>
            `[${e.elapsed}] ${e.message}`
        ).join('\n');

        alert(`Errors detected:\n\n${report}\n\nCheck console for details`);
    }

    // GitHub Pages specific helpers
    getAssetPath(asset) {
        if (this.isGitHubPages) {
            // Adjust paths for GitHub Pages subdirectory
            const repo = window.location.pathname.split('/')[1];
            return `/${repo}/${asset}`;
        }
        return asset;
    }

    checkGitHubPagesCompatibility() {
        const issues = [];

        // Check for absolute paths
        const links = document.querySelectorAll('a[href^="/"], script[src^="/"], link[href^="/"]');
        if (links.length > 0 && this.isGitHubPages) {
            issues.push(`Found ${links.length} absolute paths that may break on GitHub Pages`);
        }

        // Check for external dependencies
        const scripts = document.querySelectorAll('script[src^="http"]');
        scripts.forEach(script => {
            if (!script.src.includes('cdnjs.cloudflare.com')) {
                this.log('warning', `External script: ${script.src}`);
            }
        });

        // Check for CORS issues
        if (this.isGitHubPages && window.location.protocol === 'file:') {
            issues.push('Running from file:// protocol - some features may not work');
        }

        if (issues.length > 0) {
            this.log('warning', 'GitHub Pages compatibility issues:', issues);
        } else {
            this.log('success', 'GitHub Pages compatibility check passed');
        }

        return issues;
    }
}

// Global state machine registry
window.YggStateMachines = window.YggStateMachines || {};

// Helper function to create state machine
function createStateMachine(pageName) {
    const sm = new YggdrasilStateMachine(pageName);
    window.YggStateMachines[pageName] = sm;

    // Add keyboard shortcut for error report
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'E') {
            sm.displayErrorReport();
        }
        if (e.ctrlKey && e.shiftKey && e.key === 'L') {
            sm.exportLogs();
        }
    });

    return sm;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { YggdrasilStateMachine, createStateMachine };
}
