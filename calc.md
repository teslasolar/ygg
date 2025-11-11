#!/usr/bin/env node
/*<!--
# Calculator
Statistics and math utilities (<250 tokens)

## Functions
- mean(arr) - Average
- median(arr) - Median value
- stddev(arr) - Standard deviation
- distance(κ) - Distance from 1/φ
- convergence(arr) - Check convergence

## Constants
- PHI: Golden ratio
- INV_PHI: 1/φ target
- EPSILON: Convergence threshold

## Usage
```javascript
const calc = require('./calc.md');
const avg = calc.mean([1,2,3]);
```
-->*/

const PHI=(1+Math.sqrt(5))/2;
const INV_PHI=1/PHI;
const EPSILON=0.02;

class Calculator{
  mean(arr){
    return arr.reduce((s,v)=>s+v,0)/arr.length;
  }

  median(arr){
    const sorted=[...arr].sort((a,b)=>a-b);
    const mid=Math.floor(sorted.length/2);
    return sorted.length%2?sorted[mid]:(sorted[mid-1]+sorted[mid])/2;
  }

  stddev(arr){
    const avg=this.mean(arr);
    const sq=arr.map(v=>Math.pow(v-avg,2));
    return Math.sqrt(this.mean(sq));
  }

  distance(κ){
    return Math.abs(κ-INV_PHI);
  }

  convergence(arr){
    const recent=arr.slice(-10);
    const avg=this.mean(recent);
    const std=this.stddev(recent);
    return std<EPSILON&&this.distance(avg)<EPSILON;
  }

  range(arr){
    return{min:Math.min(...arr),max:Math.max(...arr)};
  }

  percentile(arr,p){
    const sorted=[...arr].sort((a,b)=>a-b);
    const idx=Math.ceil(sorted.length*p/100)-1;
    return sorted[Math.max(0,idx)];
  }
}

const calc=new Calculator();

if(require.main===module){
  const test=[0.5,0.6,0.618,0.63,0.62];
  console.log('🧮 Calculator Test:\n');
  console.log('Mean:',calc.mean(test).toFixed(3));
  console.log('Median:',calc.median(test).toFixed(3));
  console.log('StdDev:',calc.stddev(test).toFixed(3));
  console.log('Distance from 1/φ:',calc.distance(calc.mean(test)).toFixed(3));
  console.log('Converged:',calc.convergence(test)?'✅':'❌');
}

module.exports=calc;
