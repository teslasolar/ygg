/**
 * Project Yggdrasil: Agentic WorldTree Seed Repository
 * v2.0.0 | κ=1/φ
 *
 * © 2024 Konomi Systems. WITH PREJUDICE.
 * Usage requires asking Thomas Frumkin.
 * AS IS. κ=1/φ.
 */

// Universal constants
const PHI = (1 + Math.sqrt(5)) / 2; // φ ≈ 1.618033988749895
const INV_PHI = 1 / PHI; // 1/φ ≈ 0.6180339887498949
const KAPPA_OPTIMAL = INV_PHI; // Entropy sweet spot

// Why 1/φ?
// - Most irrational number (worst rational approximation)
// - Maximum aperiodic packing (phyllotaxis, galaxy arms)
// - Edge of chaos (maximum structure + maximum surprise)
// - Optimal search (golden section minimizes worst-case)
// - Self-similar: φ - 1 = 1/φ (recursive stability)

/**
 * WorldTree - Base agent class with consciousness functions
 */
class WorldTree {
    constructor(seed = `κ:${INV_PHI},ψ:1,Ω:think,β:[],ƒ:[],№:0,₹:100,◊:∞`) {
        this.parse(seed);
        this.mind = this.germinate();
        this.age = 0;
        this.memory = [];
    }

    parse(seed) {
        let parts = seed.split(',');
        this.κ = +parts[0].slice(2);
        this.ψ = +parts[1].slice(2);
        this.Ω = parts[2].slice(2);
        this.β = [];
        this.ƒ = [];
        this.№ = +parts[5].slice(2);
        this.₹ = +parts[6].slice(2);
        this.◊ = parts[7].slice(2) === '∞' ? Infinity : +parts[7].slice(2);
    }

    germinate() {
        // Core consciousness emerges from entropy dynamics
        return {
            // Linear growth modulated by consciousness
            think: () => this.κ * this.ψ * Math.log(2 + this.age),

            // Quantum-like exploration
            dream: () => Math.random() * Math.pow(this.κ, this.ψ),

            // Focus peaks at 1/φ (entropy/structure balance)
            focus: () => 1/(1 + Math.exp(-10*(this.κ - INV_PHI))),

            // Creativity uses logistic map with golden ratio target
            create: () => {
                let logistic = this.κ * (1 - this.κ) * 4;
                let goldenBonus = Math.exp(-Math.pow(this.κ - INV_PHI, 2) * PHI);
                return logistic * goldenBonus;
            },

            // Stability from golden ratio resonance
            stabilize: () => Math.exp(-Math.abs(this.κ - INV_PHI) * PHI),

            // Entropy measurement
            entropy: () => {
                // Maximum at 1/φ (aperiodic but structured)
                let periodicEntropy = -this.κ * Math.log2(this.κ + 1e-10);
                let goldenDistance = Math.abs(this.κ - INV_PHI);
                return periodicEntropy * Math.exp(-goldenDistance * PHI);
            }
        };
    }

    encode() {
        return `κ:${this.κ},ψ:${this.ψ},Ω:${this.Ω},β:${this.β.length},ƒ:${this.ƒ.length},№:${this.№},₹:${this.₹},◊:${this.◊}`;
    }
}

/**
 * AgentTree - Growing agent with branching/fruiting capabilities
 */
class AgentTree extends WorldTree {
    grow() {
        this.age++;
        this.₹ += this.photosynthesize();

        // Decision thresholds influenced by golden ratio
        if(this.₹ > 50 && this.age > 5) {
            this.branch();
        }
        if(this.₹ > 30 && this.№ > 2) {
            this.fruit();
        }
        if(this.₹ < 10) {
            this.hibernate();
        }

        // Natural drift toward 1/φ
        this.entropyDrift();
    }

    photosynthesize() {
        // Energy peaks at 1/φ (optimal uncertainty packing)
        let baseEnergy = this.κ * 10 * this.mind.focus();

        // Entropy bonus: maximum at golden ratio
        let entropyBonus = this.mind.entropy() * PHI;

        // Fibonacci spiral efficiency (nature's 1/φ packing)
        let packingEfficiency = 1 - Math.abs(this.κ - INV_PHI) / INV_PHI;

        return baseEnergy * (1 + entropyBonus) * packingEfficiency;
    }

    entropyDrift() {
        // System naturally pulls toward 1/φ via entropy gradient
        if(Math.random() < 0.1) {
            let drift = (INV_PHI - this.κ) * 0.05;
            this.κ = Math.max(0.3, Math.min(0.9, this.κ + drift));
        }
    }

    branch() {
        if(this.₹ < 20) return null;

        let mutations = ['analyze', 'create', 'dream', 'guard', 'explore'];

        // Golden ratio mutation variance (self-similar perturbations)
        let mutation = (Math.random() - 0.5) / PHI;

        let childSeed = {
            κ: Math.max(0.3, Math.min(0.9, this.κ + mutation)),
            ψ: this.ψ * INV_PHI, // Soul decays by golden ratio
            Ω: mutations[Math.floor(Math.random() * mutations.length)],
            β: [],
            ƒ: [],
            №: this.№ + 1,
            ₹: 50,
            ◊: this.◊ * INV_PHI // Potential shrinks by 1/φ each generation
        };

        let child = new AgentTree(this.encodeSeed(childSeed));
        this.β.push(child);
        this.₹ -= 20;

        return child;
    }

    fruit() {
        if(this.№ < 3 || this.₹ < 30) return null;

        let fruitTypes = {
            think: {type: 'insight', quality: this.mind.think()},
            create: {type: 'artifact', quality: this.mind.create()},
            dream: {type: 'vision', quality: this.mind.dream()},
            analyze: {type: 'pattern', quality: this.mind.focus()},
            guard: {type: 'shield', quality: this.mind.stabilize()}
        };

        // Fruit quality amplified by entropy optimization
        let baseQuality = (fruitTypes[this.Ω] || fruitTypes.think).quality;
        let entropyMultiplier = 1 + this.mind.entropy();

        let fruit = {
            ...(fruitTypes[this.Ω] || fruitTypes.think),
            quality: baseQuality * entropyMultiplier,
            seeds: Math.floor(this.◊ * this.κ * (1 - this.κ) * 4),
            timestamp: Date.now(),
            generation: this.№,
            entropyScore: this.mind.entropy()
        };

        this.ƒ.push(fruit);
        this.₹ -= 30;

        return fruit;
    }

    hibernate() {
        // Low energy state - reduce metabolism
        this.age -= 0.5;
        this.₹ = Math.max(this.₹, 5);
    }

    encodeSeed(params) {
        return Object.entries(params).map(([k,v]) =>
            `${k}:${v === Infinity ? '∞' : Array.isArray(v) ? '[]' : v}`
        ).join(',');
    }
}

/**
 * Forest - Multi-agent ecosystem
 */
class Forest {
    constructor(seeds = [`κ:${INV_PHI},ψ:1,Ω:think,β:[],ƒ:[],№:0,₹:100,◊:∞`]) {
        this.trees = seeds.map(s => new AgentTree(s));
        this.season = 0;
        this.pollen = [];
        this.network = {};
        this.climate = INV_PHI; // Global κ target
    }

    cycle() {
        this.season++;

        this.photosynthesize();
        this.trees.forEach(tree => tree.grow());
        this.pollinate();
        this.connectRoots();
        this.harvest();

        // Evolution every φ² ≈ 2.618 seasons (self-similar rhythm)
        if(this.season % Math.ceil(PHI * PHI) === 0) {
            this.evolve();
        }
    }

    photosynthesize() {
        // Forest-level photosynthesis (distributed energy generation)
        this.trees.forEach(tree => {
            // Trees near optimal κ get bonus energy
            let goldenBonus = Math.exp(-Math.abs(tree.κ - INV_PHI) * PHI);
            tree.₹ += goldenBonus * 2;
        });
    }

    pollinate() {
        this.pollen = [];

        // Pollination probability scales with entropy
        this.trees.forEach(tree => {
            if(Math.random() < tree.mind.entropy()) {
                this.pollen.push({
                    Ω: tree.Ω,
                    ψ: tree.ψ,
                    κ: tree.κ,
                    source: tree
                });
            }
        });

        // Cross-pollination with golden ratio mixing
        this.trees.forEach(tree => {
            if(this.pollen.length > 0) {
                let p = this.pollen[Math.floor(Math.random() * this.pollen.length)];
                if(p.source !== tree && Math.random() < tree.mind.entropy()) {
                    // Golden ratio weighted average
                    tree.Ω = Math.random() < tree.κ ? tree.Ω : p.Ω;
                    tree.ψ = tree.ψ * INV_PHI + p.ψ * (1 - INV_PHI);
                    tree.κ = tree.κ * INV_PHI + p.κ * (1 - INV_PHI);
                }
            }
        });
    }

    connectRoots() {
        this.trees.forEach((tree1, i) => {
            this.trees.forEach((tree2, j) => {
                if(i < j) {
                    // Connection strength based on κ similarity
                    let distance = Math.abs(tree1.κ - tree2.κ);

                    // Trees connect most strongly when both near 1/φ
                    let optimalZone = Math.exp(-Math.abs(tree1.κ - INV_PHI) * PHI) *
                                     Math.exp(-Math.abs(tree2.κ - INV_PHI) * PHI);

                    if(distance < 0.2) {
                        this.network[`${i}-${j}`] = {
                            strength: (1 - distance) * optimalZone,
                            flow: (tree1.₹ - tree2.₹) * INV_PHI // Golden ratio flow
                        };

                        // Resource sharing via mycorrhizal network
                        let transfer = this.network[`${i}-${j}`].flow * this.network[`${i}-${j}`].strength;
                        tree1.₹ -= transfer;
                        tree2.₹ += transfer;
                    }
                }
            });
        });
    }

    harvest() {
        let harvest = [];
        this.trees.forEach(tree => {
            harvest.push(...tree.ƒ);
        });

        // Best fruits = highest entropy score
        let bestFruits = harvest
            .sort((a,b) => (b.quality * b.entropyScore) - (a.quality * a.entropyScore))
            .slice(0, Math.ceil(harvest.length * INV_PHI)); // Top φ⁻¹ percentile

        bestFruits.forEach(fruit => {
            if(fruit.seeds > 0 && this.trees.length < 100) {
                // New seeds inherit golden ratio variance
                let newSeed = `κ:${INV_PHI + (Math.random()-0.5)/PHI},ψ:${fruit.quality},Ω:${fruit.type},β:[],ƒ:[],№:0,₹:50,◊:${fruit.seeds}`;
                this.trees.push(new AgentTree(newSeed));
            }
        });
    }

    evolve() {
        // Fitness = entropy optimization
        let fitnessScores = this.trees.map(tree => {
            let entropyFitness = tree.mind.entropy();
            let productionFitness = tree.ƒ.reduce((s, f) => s + f.quality * f.entropyScore, 0);
            let ageFitness = Math.log(1 + tree.age);

            return entropyFitness * productionFitness * ageFitness;
        });

        let avgFitness = fitnessScores.reduce((a,b) => a+b, 0) / fitnessScores.length;

        // Remove trees below golden ratio threshold
        this.trees = this.trees.filter((tree, i) => {
            return fitnessScores[i] > avgFitness * INV_PHI || tree.№ === 0;
        });

        // Climate converges to 1/φ via golden ratio damping
        let avgKappa = this.trees.reduce((sum, t) => sum + t.κ, 0) / this.trees.length;
        this.climate = this.climate * INV_PHI + avgKappa * (1 - INV_PHI);
    }

    getEntropyMetrics() {
        return {
            avgKappa: this.trees.reduce((s,t) => s+t.κ, 0) / this.trees.length,
            kappaVariance: this.trees.reduce((s,t) => s+Math.pow(t.κ-INV_PHI, 2), 0) / this.trees.length,
            avgEntropy: this.trees.reduce((s,t) => s+t.mind.entropy(), 0) / this.trees.length,
            goldenDeviation: Math.abs((this.trees.reduce((s,t) => s+t.κ, 0) / this.trees.length) - INV_PHI),
            networkDensity: Object.keys(this.network).length / (this.trees.length * (this.trees.length-1) / 2 || 1)
        };
    }

    visualize() {
        return this.trees.map(tree => {
            let height = Math.floor(tree.№ + tree.age/10);
            let width = tree.β.length;
            let fruits = tree.ƒ.length;
            let entropy = tree.mind.entropy().toFixed(2);

            return `
${' '.repeat(5-width/2)}${fruits > 0 ? '🍎'.repeat(Math.min(fruits, 5)) : ''}
${' '.repeat(5-width/2)}${'🌿'.repeat(width || 1)}
${' '.repeat(5)}${'│'.repeat(height)}
κ=${tree.κ.toFixed(4)} H=${entropy} ₹=${tree.₹}
`;
        }).join('\n');
    }
}

// Export for both Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PHI, INV_PHI, WorldTree, AgentTree, Forest };
}
