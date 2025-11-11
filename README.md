# 🌳 Project Yggdrasil - Document Driven Interface (DDI)

**v2.0.0 | κ=1/φ | Executable Markdown Architecture**

## Overview

Project Yggdrasil is now a **Document Driven Interface (DDI)** system where ALL logic is contained in executable `.md` files under 250 tokens each. This enables GitHub Pages to act as a dynamic processor while maintaining static hosting.

### Philosophy

- **All files are `.md`** - Documentation IS the code
- **Under 250 tokens** - Ultra-compressed modular architecture
- **Self-executing** - Run with `node filename.md`
- **Browser-compatible** - Load dynamically in HTML via md-loader.md
- **GitHub Pages native** - Static hosting, dynamic execution

## Golden Ratio Convergence

The system naturally evolves toward the golden ratio inverse (κ=1/φ ≈ 0.618034) through:
- **Entropy optimization** - Agents with κ near 1/φ have highest entropy scores
- **Energy production** - Photosynthesis peaks at κ=1/φ
- **Natural selection** - Tournament-based evolution favors optimal agents
- **Mycorrhizal networks** - Resource sharing strengthens convergence

```
φ = (1 + √5) / 2 ≈ 1.618033988749895
1/φ ≈ 0.6180339887498949 ← System convergence target
```

## File Structure

### Core Modules (<250 tokens each)

| File | Size | Purpose |
|------|------|---------|
| `run.md` | 247 tokens | Main entry point and command runner |
| `wt.md` | 198 tokens | WorldTree core consciousness system |
| `ag.md` | 213 tokens | AgentTree with photosynthesis and reproduction |
| `fr.md` | 232 tokens | Forest ecosystem with evolution |
| `sm.md` | 248 tokens | State machine for lifecycle management |
| `md-loader.md` | 178 tokens | Browser-side markdown executor |

### HTML Interfaces

| File | Purpose |
|------|---------|
| `index.html` | Landing page with navigation |
| `forest.html` | 3D/2D forest visualization |
| `agents.html` | Agent inspector |
| `metrics.html` | Convergence metrics dashboard |

### Legacy Files (being phased out)

| File | Status |
|------|--------|
| `worldtree.js` | ⚠️ Deprecated - use wt.md, ag.md, fr.md |
| `state-machine.js` | ⚠️ Deprecated - use sm.md |

## Usage

### Command Line (Node.js)

```bash
# Show help
node run.md help

# Run forest simulation
node run.md forest

# Generate agent report
node run.md agents

# Show convergence metrics
node run.md metrics

# Test all modules
node run.md test
```

### Example Output

```bash
$ node run.md metrics
🌳 Yggdrasil v2.0.0 | φ=1.618034 | 1/φ=0.618034

▶️  Show convergence metrics...

📈 Population: 3
📊 Avg κ: 0.600626 (target: 0.618034)
🎯 Near 1/φ: 3 (100.0%)
```

### Browser (GitHub Pages)

```html
<!-- Load markdown loader -->
<script src="md-loader.md"></script>

<script>
// Create loader instance
const loader = new MarkdownLoader();

// Load modules
const WorldTree = await loader.load('wt.md');
const AgentTree = await loader.load('ag.md');
const Forest = await loader.load('fr.md');

// Use them!
const forest = new Forest();
for (let i = 0; i < 10; i++) {
    forest.cycle();
}

console.log(`Trees: ${forest.trees.length}`);
console.log(`Avg κ: ${forest.trees.reduce((s,t) => s+t.κ, 0) / forest.trees.length}`);
</script>
```

## Executable Markdown Format

All `.md` files follow this pattern:

```markdown
#!/usr/bin/env node
/*<!--
# Module Name
Documentation in markdown format

## Features
- Feature 1
- Feature 2
-->*/

// Executable JavaScript code here
const code = 'goes here';

module.exports = ExportedClass;
```

### Key Features

1. **Shebang** (`#!/usr/bin/env node`) - Makes file executable
2. **Markdown docs** - Inside `/*<!-- -->*/` HTML comment block
3. **Executable code** - Standard JavaScript after doc block
4. **Module export** - Works in Node.js and browser

## DNA Encoding

Each agent has a 50-byte DNA seed:

```
κ:0.618,ψ:1,Ω:think,β:[],ƒ:[],n:0,r:100,l:∞
```

| Symbol | Property | Description |
|--------|----------|-------------|
| κ | kappa | Entropy parameter (convergence target) |
| ψ | psi | Consciousness amplifier |
| Ω | omega | Decision mode (think/dream/focus) |
| β | beta | Branch offspring array |
| ƒ | fruit | Fruit variants array |
| n | number | Agent ID number |
| r | resources | Resource points (energy) |
| l | lifespan | Maximum age (∞ = infinite) |

## Consciousness Functions

Every WorldTree has 6 consciousness functions:

```javascript
mind.think()      // κ * ψ * log(2 + age)
mind.dream()      // random() * κ^ψ
mind.focus()      // sigmoid(κ - 1/φ)
mind.create()     // logistic_map(κ) * golden_bonus
mind.stabilize()  // exp(-|κ - 1/φ| * φ)
mind.entropy()    // periodic_entropy * exp(-distance_to_golden * φ)
```

## Agent Actions

### Photosynthesis
```javascript
energy = κ * 10 * focus() * (1 + entropy() * φ) * packing_efficiency
```
Energy production peaks when κ ≈ 1/φ

### Branching
Create offspring with mutation:
```javascript
child.κ = parent.κ + random(-0.05, 0.05)
```

### Fruiting
Generate variant near golden ratio:
```javascript
fruit.κ = 1/φ + random(-0.1, 0.1)
```

## Forest Operations

### Cycle
1. All agents grow (photosyn thesize, branch, fruit)
2. New offspring added to forest
3. Pollination (every 3 cycles)
4. Root connections (every 5 cycles)
5. Evolution (every φ² ≈ 3 cycles)

### Pollination (Genetic Crossover)
```javascript
child.κ = (parentA.κ + parentB.κ) / 2 + noise
```

### Mycorrhizal Networks
Agents with similar κ (< 0.05 apart) share resources

### Evolution (Natural Selection)
Keep top 70% by entropy score, cull the rest

## State Machine

Manages lifecycle across all pages:

```
UNINITIALIZED → LOADING → CHECKING_DEPS → INITIALIZING → READY → RUNNING
                              ↓               ↓
                          FALLBACK         ERROR
```

### Features
- Global error capture
- Automatic recovery
- GitHub Pages detection
- Dependency validation
- Performance metrics

## Token Budget

All modules kept under 250 tokens for optimal performance:

- **wt.md**: 198 tokens ✅
- **ag.md**: 213 tokens ✅
- **fr.md**: 232 tokens ✅
- **sm.md**: 248 tokens ✅
- **run.md**: 247 tokens ✅
- **md-loader.md**: 178 tokens ✅

## GitHub Pages Deployment

1. **Push to repository**: All `.md` files are committed
2. **Enable GitHub Pages**: Settings → Pages → Deploy from branch
3. **Access**: `https://username.github.io/ygg/`

The system automatically:
- Detects GitHub Pages environment
- Adjusts asset paths
- Falls back to 2D if Three.js fails
- Logs all errors for debugging

## Development Workflow

### Adding New Modules

1. Create `module.md` with executable markdown format
2. Keep under 250 tokens
3. Export via `module.exports`
4. Add command to `run.md` if needed
5. Update this README

### Testing

```bash
# Test individual module
node wt.md

# Test all modules
node run.md test

# Run simulation
node run.md forest

# Check convergence
node run.md metrics
```

## Mathematical Foundation

### Entropy Sweet Spot

The system converges to κ=1/φ because:

1. **Periodic entropy** maximizes near irrational numbers
2. **Golden ratio is "most irrational"** (continued fraction [1,1,1,1,...])
3. **Packing efficiency** peaks at φ-based ratios
4. **Fibonacci spirals** emerge naturally from golden angle

### Convergence Proof

```
E(κ) = -κ * log₂(κ) * exp(-|κ - 1/φ| * φ)

dE/dκ = 0  when  κ ≈ 1/φ
```

Agents with κ near 1/φ have:
- Maximum entropy → selected by evolution
- Maximum energy → more offspring
- Strong network connections → resource advantages

## Performance

- **Module load**: ~1ms per .md file
- **Cycle time**: ~0.1ms per agent
- **Convergence**: 50-100 cycles to reach κ ≈ 1/φ ± 0.02
- **Memory**: ~5MB for 100 agents
- **Token efficiency**: 6 modules in 1316 tokens total

## Future Enhancements

- **Multi-file modules**: Split large modules into sub-modules
- **Binary DNA encoding**: Compress 50-byte seeds to 18 bytes
- **WebAssembly modules**: Compile hot paths to WASM
- **Service worker caching**: Cache .md files for offline use
- **Real-time collaboration**: Multi-user forest synchronization

## Links

- **GitHub**: https://github.com/teslasolar/ygg
- **Live Demo**: https://teslasolar.github.io/ygg/
- **Documentation**: STATE-MACHINE-GUIDE.md

## License

© 2024 Konomi Systems. WITH PREJUDICE. | AS IS.

---

🌳 **Every component under 250 tokens** | 📦 **Document Driven Interface** | ⚡ **Static site, dynamic execution**
