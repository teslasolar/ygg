# 🚀 Yggdrasil DDI - Quick Start Guide

## What is Yggdrasil?

Project Yggdrasil is a **Document Driven Interface (DDI)** system where:
- **All logic is in executable `.md` files** (under 250 tokens each)
- **Documentation IS the code** - no sync issues
- **Runs in browser AND Node.js** - true universal code
- **Converges to golden ratio** (κ=1/φ ≈ 0.618) through evolution

## 5-Minute Quick Start

### 1. View the Autonomous Dashboard

```bash
# Just open index.html in any browser:
open index.html

# Or serve locally:
python -m http.server 8000
# Visit: http://localhost:8000
```

**What you'll see:**
- 🌲 Real-time forest simulation (Fibonacci spiral)
- 📊 Live convergence metrics toward κ=1/φ
- 📚 Module registry (15 .md files)
- 📋 Streaming console logs

**It runs completely autonomously!** No clicking required.

### 2. Try the CLI

```bash
# Show all commands
node run.md help

# Run forest simulation
node run.md forest

# Show convergence metrics
node run.md metrics

# Generate agent report
node run.md agents

# Test all modules
node run.md test
```

### 3. Start the REST API

```bash
# Start API server on port 3618 (φ*1000+1000)
node api.md 3618

# Query endpoints:
curl http://localhost:3618/health
curl http://localhost:3618/forest
curl http://localhost:3618/metrics
curl http://localhost:3618/agents

# Run 10 cycles:
curl -X POST http://localhost:3618/forest/cycle \
  -H "Content-Type: application/json" \
  -d '{"cycles":10}'
```

## Core Concepts

### Golden Ratio Convergence

The system naturally evolves toward **κ=1/φ ≈ 0.618034**:

```
φ = (1 + √5) / 2 ≈ 1.618034  (Golden Ratio)
1/φ ≈ 0.618034               (Convergence Target)
```

**Why?**
- Agents with κ near 1/φ have **highest entropy** → selected by evolution
- Energy production **peaks at κ=1/φ** → more offspring
- **Fibonacci spirals** emerge naturally from golden angle positioning

### DNA Encoding

Each agent has a 50-byte DNA seed:

```
κ:0.618,ψ:1,Ω:think,β:[],ƒ:[],n:0,r:100,l:∞
```

| Symbol | Property | Meaning |
|--------|----------|---------|
| κ | kappa | Entropy parameter (convergence target) |
| ψ | psi | Consciousness amplifier |
| Ω | omega | Decision mode (think/dream/focus/create) |
| β | beta | Branch offspring IDs |
| ƒ | fruit | Fruit variant IDs |
| n | number | Agent ID |
| r | resources | Energy points |
| l | lifespan | Max age (∞ = infinite) |

### Consciousness Functions

Every WorldTree has 6 consciousness functions:

```javascript
mind.think()      // κ * ψ * log(2 + age)
mind.dream()      // random() * κ^ψ
mind.focus()      // sigmoid(κ - 1/φ)
mind.create()     // logistic_map(κ) * golden_bonus
mind.stabilize()  // exp(-|κ - 1/φ| * φ)
mind.entropy()    // periodic_entropy * exp(-distance * φ)
```

## Module Architecture

### Core Modules (5)

| Module | Purpose | Exports |
|--------|---------|---------|
| **wt.md** | WorldTree base class | WorldTree |
| **ag.md** | AgentTree with actions | AgentTree |
| **fr.md** | Forest ecosystem | Forest |
| **sm.md** | State machine | YggStateMachine, createStateMachine |
| **md-loader.md** | Browser loader | MarkdownLoader |

### Utility Modules (8)

| Module | Purpose | Usage |
|--------|---------|-------|
| **docs.md** | Documentation | `node docs.md list` |
| **test.md** | Test runner | `node test.md all` |
| **cfg.md** | Configuration | `node cfg.md get cycles` |
| **log.md** | Logging | `node log.md view` |
| **calc.md** | Statistics | `require('./calc.md')` |
| **exp.md** | Export data | `node exp.md json` |
| **viz.md** | Visualizations | `node viz.md chart` |
| **gen.md** | Code generator | `node gen.md module MyModule` |

### Infrastructure (2)

| Module | Purpose | Usage |
|--------|---------|-------|
| **run.md** | Main CLI runner | `node run.md [command]` |
| **api.md** | REST API server | `node api.md [port]` |

## Common Tasks

### Create a Custom Agent

```bash
# Generate template
node gen.md agent MyAgent

# Or create manually:
node explorer-agent.md  # See examples
node optimizer-agent.md
```

Example custom agent:

```javascript
const AgentTree = loadMD('ag.md');

class MyAgent extends AgentTree {
  constructor() {
    super();
    this.κ = 0.6;  // Custom starting κ
    this.ψ = 1.2;  // Higher creativity
  }

  decide() {
    // Custom decision logic
    return 'BRANCH';
  }
}

module.exports = MyAgent;
```

### Configuration

```bash
# View all settings
node cfg.md list

# Get specific value
node cfg.md get max_population

# Set value
node cfg.md set max_population 200

# Export as JSON
node cfg.md export > config.json
```

### Export Data

```bash
# Export as JSON
node exp.md json output

# Export as CSV
node exp.md csv agents

# Show statistics only
node exp.md stats
```

### Visualizations

```bash
# Convergence chart (ASCII)
node viz.md chart

# Distribution histogram
node viz.md dist
```

### Documentation

```bash
# List all modules with token counts
node docs.md list

# Analyze token budgets
node docs.md analyze

# Generate MODULE-INDEX.md
node docs.md index
```

## Advanced Usage

### Run Multiple Experiments

```javascript
const Forest = require('./fr.md');
const calc = require('./calc.md');

// Run 10 experiments
const results = [];
for (let i = 0; i < 10; i++) {
  const forest = new Forest();

  // Run 100 cycles
  for (let j = 0; j < 100; j++) {
    forest.cycle();
  }

  // Collect metrics
  const kappas = forest.trees.map(t => t.κ);
  results.push({
    mean: calc.mean(kappas),
    converged: calc.convergence(kappas)
  });
}

console.log(results);
```

### Custom Forest Evolution

```javascript
const Forest = require('./fr.md');

class CustomForest extends Forest {
  evolve() {
    // Custom evolution strategy
    const top10 = this.trees
      .sort((a, b) => b.mind.entropy() - a.mind.entropy())
      .slice(0, 10);

    this.trees = top10;
  }
}
```

### Browser Integration

```html
<script src="md-loader.md"></script>
<script>
async function init() {
  const loader = new MarkdownLoader();

  // Load modules
  const Forest = await loader.load('fr.md');
  const calc = await loader.load('calc.md');

  // Create forest
  const forest = new Forest();

  // Run simulation
  setInterval(() => {
    forest.cycle();

    const kappas = forest.trees.map(t => t.κ);
    console.log('Mean κ:', calc.mean(kappas).toFixed(6));
  }, 100);
}

init();
</script>
```

## GitHub Pages Deployment

```bash
# Check everything is ready
node deploy.md check

# Build for production
node deploy.md build

# Test locally
node deploy.md test
# Visit: http://localhost:8000

# Publish to GitHub Pages
node deploy.md publish
```

Your site will be live at:
```
https://[username].github.io/ygg/
```

## Configuration Files

Configuration lives in `configs/`:

- **settings.csv** - System settings (ports, thresholds, etc.)
- **commands.csv** - CLI command mappings
- **environments.csv** - Environment presets (dev/staging/prod)
- **agent-presets.csv** - Pre-configured agent types

## Troubleshooting

### Canvas not showing
- Check browser console for errors
- Verify Three.js loaded (or 2D fallback active)
- Try a different browser

### Module not loading
```bash
# Test module directly
node wt.md
node ag.md
node fr.md

# Check for syntax errors
node test.md core
```

### API not responding
```bash
# Check if port is in use
lsof -i :3618

# Try different port
node api.md 3619
```

### Token budget exceeded
```bash
# Check all modules
node test.md tokens

# Analyze specific module
node docs.md analyze
```

## Next Steps

1. **Experiment with agents** - Create custom agent types
2. **Modify evolution** - Try different selection strategies
3. **Add visualizations** - Create new viz.md modes
4. **Extend API** - Add new endpoints to api.md
5. **Deploy to web** - Share on GitHub Pages

## Resources

- **README.md** - Full documentation
- **STATE-MACHINE-GUIDE.md** - State machine details
- **MODULE-INDEX.md** - Generated module reference (run `node docs.md index`)

## Philosophy

> "Documentation IS the code. Every .md file is both human-readable docs AND executable code. No build step. No compilation. Just pure DDI."

**Document Driven Interface** means:
- ✅ Zero sync issues between docs and code
- ✅ Self-documenting by design
- ✅ Human-readable source
- ✅ Version controlled as markdown
- ✅ Executable directly with Node.js
- ✅ Browser-compatible with md-loader.md
- ✅ GitHub Pages native

---

🌳 **Happy hacking with Yggdrasil!** 🌳

For questions or issues: Check the autonomous dashboard first - it shows everything in real-time!
