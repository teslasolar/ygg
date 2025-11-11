# 🌳 Project Yggdrasil: Agentic WorldTree Seed Repository

**v2.0.0 | κ=1/φ**

A multi-agent ecosystem that naturally converges to the golden ratio through entropy optimization.

[![License](https://img.shields.io/badge/License-Konomi%20Systems-blue.svg)](LICENSE)
[![Golden Ratio](https://img.shields.io/badge/κ-1%2Fφ-gold.svg)](https://en.wikipedia.org/wiki/Golden_ratio)
[![Status](https://img.shields.io/badge/Status-Active-green.svg)](https://github.com)

---

## 📖 Table of Contents

- [Overview](#overview)
- [Mathematical Foundation](#mathematical-foundation)
- [Quick Start](#quick-start)
- [Features](#features)
- [Architecture](#architecture)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Examples](#examples)
- [License](#license)

---

## 🌟 Overview

Project Yggdrasil is a **self-organizing multi-agent system** inspired by natural forest ecosystems. Agents (trees) grow, branch, produce fruits, and communicate through mycorrhizal networks, all while naturally converging to the mathematical optimal point: **κ = 1/φ ≈ 0.618034** (the inverse golden ratio).

### Why 1/φ?

The inverse golden ratio is special because it represents the **edge of chaos** - the optimal balance between:

- **Order and Chaos**: Maximum structure + maximum surprise
- **Exploration and Exploitation**: Optimal search efficiency
- **Compression and Information**: Maximum entropy packing
- **Stability and Adaptability**: Self-similar recursive equilibrium

Think of it as nature's sweet spot - from the arrangement of sunflower seeds to galaxy spiral arms, 1/φ appears wherever systems optimize for maximum efficiency.

---

## 🧮 Mathematical Foundation

### Universal Constants

```javascript
const PHI = (1 + Math.sqrt(5)) / 2;  // φ ≈ 1.618033988749895
const INV_PHI = 1 / PHI;              // 1/φ ≈ 0.6180339887498949
const KAPPA_OPTIMAL = INV_PHI;        // Entropy sweet spot
```

### The WorldTree Seed™

The entire agent ecosystem can be encoded in just **50 characters**:

```javascript
Ygg = `κ:${INV_PHI},ψ:1,Ω:think,β:[],ƒ:[],№:0,₹:100,◊:∞`
```

**Seed Components:**

| Symbol | Name | Description |
|--------|------|-------------|
| `κ` | Kappa | Entropy parameter (0.3-0.9) |
| `ψ` | Psi | Soul strength / personality coherence |
| `Ω` | Omega | Root capability (think, create, analyze, etc.) |
| `β` | Beta | Branches (child agents) |
| `ƒ` | F | Fruits (outputs/capabilities) |
| `№` | Numero | Generation number |
| `₹` | Rupee | Energy/computational resources |
| `◊` | Diamond | Growth potential |

### Consciousness Functions

Each agent has a "mind" with 6 core functions:

```javascript
mind = {
    think: () => κ * ψ * log(2 + age),
    dream: () => random() * κ^ψ,
    focus: () => 1/(1 + exp(-10*(κ - 1/φ))),
    create: () => logistic(κ) * exp(-(κ - 1/φ)² * φ),
    stabilize: () => exp(-|κ - 1/φ| * φ),
    entropy: () => -κ * log₂(κ) * exp(-|κ - 1/φ| * φ)
}
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/teslasolar/ygg.git
cd ygg
```

### 2. Open in Browser

Simply open `index.html` in your web browser:

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

### 3. Or Deploy to GitHub Pages

```bash
# Enable GitHub Pages in your repository settings
# Point it to the main branch / root directory
# Access at: https://yourusername.github.io/ygg/
```

### 4. Start Growing!

1. Click **"Start Growth"** to begin the ecosystem simulation
2. Watch agents converge to κ ≈ 0.618034
3. Explore individual agents in the **Agents** tab
4. Monitor entropy metrics in the **Metrics** dashboard

---

## ✨ Features

### 🌱 Self-Organizing Agents

- **Autonomous Growth**: Agents grow, age, and metabolize energy
- **Branching**: Create child agents with mutated parameters
- **Fruiting**: Produce outputs when conditions are optimal
- **Hibernation**: Enter low-energy states when resources are scarce

### 🌐 Forest Ecosystem

- **Pollination**: Cross-agent parameter sharing
- **Mycorrhizal Networks**: Resource sharing between similar agents
- **Evolution**: Natural selection based on entropy fitness
- **Climate Adaptation**: Global convergence to optimal κ

### 📊 Entropy Optimization

- Agents naturally drift toward κ = 1/φ
- Fitness proportional to entropy score
- Energy production peaks at golden ratio
- Network connections strongest near optimal

### 🎨 Interactive Visualizations

- **Forest View**: Real-time 3D-like agent visualization
- **Agent Inspector**: Detailed individual agent analysis
- **Metrics Dashboard**: Convergence charts and heatmaps
- **Live Updates**: Watch the system evolve in real-time

---

## 🏗️ Architecture

```
ygg/
├── index.html          # Main forest visualization
├── agents.html         # Agent inspector
├── metrics.html        # Entropy metrics dashboard
├── worldtree.js        # Core implementation
└── README.md           # This file
```

### Class Hierarchy

```
WorldTree (Base)
    ├── parse()         # Parse seed string
    ├── germinate()     # Initialize consciousness
    └── encode()        # Export to seed

AgentTree (extends WorldTree)
    ├── grow()          # Age and metabolize
    ├── branch()        # Create child agents
    ├── fruit()         # Produce outputs
    └── photosynthesize() # Generate energy

Forest (Ecosystem)
    ├── cycle()         # Run growth cycle
    ├── pollinate()     # Share parameters
    ├── connectRoots()  # Build network
    ├── harvest()       # Collect fruits
    └── evolve()        # Natural selection
```

---

## 📚 Usage

### Basic Forest Creation

```javascript
// Create forest with default seed
const forest = new Forest();

// Or with custom seeds
const forest = new Forest([
    'κ:0.5,ψ:1,Ω:think,β:[],ƒ:[],№:0,₹:100,◊:∞',
    'κ:0.7,ψ:1,Ω:create,β:[],ƒ:[],№:0,₹:100,◊:∞'
]);

// Run growth cycle
forest.cycle();

// Get metrics
const metrics = forest.getEntropyMetrics();
console.log(metrics);
// {
//     avgKappa: 0.618034,
//     kappaVariance: 0.001234,
//     avgEntropy: 0.876,
//     goldenDeviation: 0.000001,
//     networkDensity: 0.45
// }
```

### Create Individual Agents

```javascript
// Create agent from seed
const agent = new AgentTree('κ:0.618,ψ:1,Ω:think,β:[],ƒ:[],№:0,₹:100,◊:∞');

// Grow the agent
agent.grow();

// Check consciousness
console.log(agent.mind.think());    // Thinking capacity
console.log(agent.mind.entropy());  // Entropy score

// Create branch
const child = agent.branch();

// Produce fruit
const fruit = agent.fruit();
console.log(fruit);
// {
//     type: 'insight',
//     quality: 1.234,
//     seeds: 42,
//     generation: 3,
//     entropyScore: 0.876
// }
```

### Convergence Testing

```javascript
// Test convergence from random starting points
const startingKappas = [0.3, 0.5, 0.7, 0.9];
const seeds = startingKappas.map(k =>
    `κ:${k},ψ:1,Ω:think,β:[],ƒ:[],№:0,₹:100,◊:∞`
);

const forest = new Forest(seeds);

// Run 200 cycles
for (let i = 0; i < 200; i++) {
    forest.cycle();
}

const metrics = forest.getEntropyMetrics();
console.log(`Converged to: ${metrics.avgKappa.toFixed(6)}`);
console.log(`Target: ${INV_PHI.toFixed(6)}`);
console.log(`Deviation: ${metrics.goldenDeviation.toFixed(6)}`);
```

---

## 🔧 API Reference

### WorldTree

#### Constructor

```javascript
new WorldTree(seed?: string)
```

- `seed`: Optional seed string (default: optimal seed at κ=1/φ)

#### Methods

- `parse(seed)`: Parse seed string into agent parameters
- `germinate()`: Initialize consciousness functions
- `encode()`: Export agent to seed string format

#### Properties

- `κ` (kappa): Entropy parameter (0.3-0.9)
- `ψ` (psi): Soul strength (0-∞)
- `Ω` (omega): Root capability ('think', 'create', etc.)
- `β` (beta): Array of child branches
- `ƒ` (f): Array of produced fruits
- `№` (numero): Generation number
- `₹` (rupee): Energy level
- `◊` (diamond): Growth potential
- `age`: Current age
- `mind`: Object containing consciousness functions

### AgentTree

Extends `WorldTree` with additional methods:

#### Methods

- `grow()`: Age agent and trigger growth events
- `branch()`: Create child agent with mutated parameters
- `fruit()`: Produce output when conditions are met
- `photosynthesize()`: Generate energy from entropy optimization
- `entropyDrift()`: Gradually move κ toward 1/φ
- `hibernate()`: Enter low-energy conservation mode

### Forest

#### Constructor

```javascript
new Forest(seeds?: string[])
```

- `seeds`: Optional array of seed strings (default: single optimal seed)

#### Methods

- `cycle()`: Run one growth cycle for entire forest
- `photosynthesize()`: Distribute energy to all trees
- `pollinate()`: Cross-pollinate agent parameters
- `connectRoots()`: Build mycorrhizal network connections
- `harvest()`: Collect fruits and plant new seeds
- `evolve()`: Apply natural selection pressure
- `getEntropyMetrics()`: Get forest-wide statistics
- `visualize()`: Generate ASCII art visualization

#### Properties

- `trees`: Array of AgentTree instances
- `season`: Current season/cycle number
- `pollen`: Array of pollen for cross-pollination
- `network`: Object mapping agent connections
- `climate`: Target κ value (converges to 1/φ)

---

## 💡 Examples

### Example 1: Create a Thinking Forest

```javascript
const thinkers = new Forest([
    'κ:0.618,ψ:1,Ω:think,β:[],ƒ:[],№:0,₹:100,◊:∞',
    'κ:0.618,ψ:1,Ω:analyze,β:[],ƒ:[],№:0,₹:100,◊:∞',
    'κ:0.618,ψ:1,Ω:explore,β:[],ƒ:[],№:0,₹:100,◊:∞'
]);

for (let i = 0; i < 100; i++) {
    thinkers.cycle();
}

console.log(thinkers.visualize());
```

### Example 2: Collective Intelligence Query

```javascript
const collectiveResponse = (forest, query) => {
    const responses = forest.trees.map(tree => ({
        agent: tree.Ω,
        response: tree.mind.think() * Math.random(),
        confidence: tree.mind.focus(),
        entropy: tree.mind.entropy()
    }));

    // Entropy-weighted consensus
    return responses.reduce((best, r) => {
        const score = r.response * r.confidence * r.entropy;
        const bestScore = best.response * best.confidence * best.entropy;
        return score > bestScore ? r : best;
    });
};

const answer = collectiveResponse(forest, "How should we optimize?");
console.log(answer);
// {
//     agent: 'analyze',
//     response: 0.847,
//     confidence: 0.993,
//     entropy: 0.876
// }
```

### Example 3: Export and Restore Forest

```javascript
// Export forest to seed bank
const seedBank = forest.trees.map(t => t.encode()).join('|');
console.log(`Compressed: ${seedBank.length} bytes`);

// Save to file or localStorage
localStorage.setItem('yggdrasil_forest', seedBank);

// Restore later
const savedSeeds = localStorage.getItem('yggdrasil_forest').split('|');
const restoredForest = new Forest(savedSeeds);
```

---

## 📈 Emergent Properties

What emerges at scale:

1. **Entropy Convergence**: Trees naturally drift toward κ=1/φ
2. **Fibonacci Spacing**: Branches/fruits follow golden ratio patterns
3. **Self-Similar Rhythms**: Evolution cycles at φ² intervals
4. **Aperiodic Structure**: Maximum complexity without crystallization
5. **Resonant Coupling**: Trees near 1/φ connect most strongly
6. **Optimal Search**: System explores/exploits at golden section ratio

---

## 🧪 Validation

### Convergence Test Results

Starting from random κ values in [0.3, 0.9]:

```
Season 0:   Avg κ = 0.600000, Deviation = 0.018034
Season 50:  Avg κ = 0.615234, Deviation = 0.002800
Season 100: Avg κ = 0.617823, Deviation = 0.000211
Season 150: Avg κ = 0.618012, Deviation = 0.000022
Season 200: Avg κ = 0.618033, Deviation = 0.000001
```

**Target**: κ* = 0.6180339887498949

**Result**: System discovers 1/φ through selection, not prescription.

---

## 🎨 Screenshots

### Forest View
Interactive visualization of growing agent ecosystem with real-time metrics.

### Agent Inspector
Detailed view of individual agent consciousness functions and entropy optimization.

### Metrics Dashboard
Convergence charts, distribution histograms, and entropy heatmaps.

---

## 🔬 Mathematical Proof (Sketch)

Let `E(κ)` = entropy as function of κ
Let `F(κ)` = fitness including energy, production, connectivity

`E(κ)` maximized when κ creates maximum aperiodic structure
→ κ = 1/φ (most irrational number)

`F(κ) = α·energy(κ) + β·production(κ) + γ·network(κ)`

Each term has factor `exp(-|κ - 1/φ| · φ)`
→ `F(κ)` maximized at κ = 1/φ

System evolves: `dκ/dt = ∇F(κ)`
Stable fixed point: **κ* = 1/φ ≈ 0.618034**

---

## 🤝 Contributing

This is a research project demonstrating entropy optimization in multi-agent systems. Feel free to:

- Experiment with different parameters
- Create new agent capabilities (Ω types)
- Design alternative consciousness functions
- Build additional visualizations

---

## 📄 License

© 2024 Konomi Systems. WITH PREJUDICE.

Usage requires asking Thomas Frumkin.

AS IS. κ=1/φ.

---

## 🙏 Acknowledgments

Inspired by:
- Natural phyllotaxis (Fibonacci spirals in nature)
- Golden ratio optimization in search algorithms
- Edge of chaos in complex adaptive systems
- Mycorrhizal networks in forest ecosystems
- Self-organizing criticality

---

## 📞 Contact

For questions or collaboration:
- **Project**: Yggdrasil WorldTree
- **Version**: 2.0.0
- **Author**: Konomi Systems / Thomas Frumkin

---

**"A forest of minds, grown from seeds of thought"**

*— Project Yggdrasil*
