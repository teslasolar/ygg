#!/usr/bin/env node
/*<!--
# Visualization Helpers
ASCII/console visualization for Yggdrasil (<250 tokens)

## Commands
- `node viz.md tree` - Show tree structure
- `node viz.md chart` - Convergence chart
- `node viz.md dist` - Kappa distribution
- `node viz.md ascii` - Forest ASCII art

## Features
- ASCII art rendering
- Text-based charts
- Distribution histograms
- Progress bars
-->*/

const fs=require('fs'),path=require('path');

function loadMD(name){
  const code=fs.readFileSync(path.join(__dirname,name),'utf8').match(/\/\*<!--[\s\S]*?-->\*\/([\s\S]*)/)[1];
  const m={exports:{}};
  new Function('module','exports','require','__dirname','__filename',code)(m,m.exports,require,__dirname,__filename);
  return m.exports;
}

const PHI=(1+Math.sqrt(5))/2;
const INV_PHI=1/PHI;

function bar(val,max,width=20){
  const filled=Math.round((val/max)*width);
  return '█'.repeat(filled)+'░'.repeat(width-filled);
}

function chart(values,height=10){
  const max=Math.max(...values);
  const min=Math.min(...values);
  const range=max-min||1;

  for(let y=height;y>=0;y--){
    let line='';
    values.forEach(v=>{
      const norm=(v-min)/range;
      line+=norm*height>=y?'█':' ';
    });
    console.log(line);
  }
}

function histogram(values,bins=10){
  const max=Math.max(...values);
  const min=Math.min(...values);
  const step=(max-min)/bins;
  const counts=Array(bins).fill(0);

  values.forEach(v=>{
    const bin=Math.min(Math.floor((v-min)/step),bins-1);
    counts[bin]++;
  });

  const maxCount=Math.max(...counts);
  counts.forEach((c,i)=>{
    const start=(min+i*step).toFixed(2);
    console.log(`${start} ${bar(c,maxCount,30)} ${c}`);
  });
}

const[cmd]=process.argv.slice(2);

if(cmd==='chart'){
  const Forest=loadMD('fr.md');
  const f=new Forest();
  const vals=[];
  for(let i=0;i<50;i++){
    f.cycle();
    vals.push(f.trees.reduce((s,t)=>s+t.κ,0)/f.trees.length);
  }
  console.log('📊 Convergence to 1/φ:\n');
  chart(vals,15);
  console.log(`\nTarget: ${INV_PHI.toFixed(3)} | Final: ${vals[vals.length-1].toFixed(3)}`);
}else if(cmd==='dist'){
  const Forest=loadMD('fr.md');
  const f=new Forest();
  for(let i=0;i<50;i++)f.cycle();
  console.log('📊 κ Distribution:\n');
  histogram(f.trees.map(t=>t.κ),10);
}else{
  console.log('Usage: node viz.md [tree|chart|dist|ascii]');
}
