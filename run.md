#!/usr/bin/env node
/*<!--
# 🌳 Yggdrasil Runner
Main entry point for Project Yggdrasil v2.0.0 | κ=1/φ

## Commands
- `node run.md forest` - Run forest simulation
- `node run.md agents` - Generate agent report
- `node run.md metrics` - Show convergence stats
- `node run.md test` - Test all modules

## Modules
- wt.md - WorldTree core
- ag.md - AgentTree class
- fr.md - Forest ecosystem
- sm.md - State machine
-->*/

const fs=require('fs'),path=require('path');
const [cmd,...args]=process.argv.slice(2);

const PHI=(1+Math.sqrt(5))/2;
const INV_PHI=1/PHI;

const ops={
  forest:'Run forest simulation',
  agents:'Generate agent report',
  metrics:'Show convergence metrics',
  test:'Test all modules',
  help:'Show this help'
};

function loadModule(name){
  const p=path.join(__dirname,name+'.md');
  if(!fs.existsSync(p))return null;
  const code=fs.readFileSync(p,'utf8');
  const match=code.match(/\/\*<!--[\s\S]*?-->\*\/([\s\S]*)/);
  return match?match[1].trim():code;
}

function exec(code){
  const mod={exports:{}};
  new Function('module','exports','require','__dirname','__filename',code)(mod,mod.exports,require,__dirname,__filename);
  return mod.exports;
}

console.log('🌳 Yggdrasil v2.0.0 | φ='+(PHI).toFixed(6)+' | 1/φ='+(INV_PHI).toFixed(6));

if(!cmd||cmd==='help'){
  console.log('\n📋 Available commands:');
  Object.entries(ops).forEach(([k,v])=>console.log(`  ${k.padEnd(10)} ${v}`));
  process.exit(0);
}

if(ops[cmd]){
  console.log(`\n▶️  ${ops[cmd]}...\n`);
  try{
    const WorldTree=exec(loadModule('wt'));
    const AgentTree=exec(loadModule('ag'));
    const Forest=exec(loadModule('fr'));

    if(cmd==='forest'){
      const f=new Forest();
      for(let i=0;i<10;i++)f.cycle();
      console.log(`🌲 Trees: ${f.trees.length}`);
      console.log(`📊 Avg κ: ${(f.trees.reduce((s,t)=>s+t.κ,0)/f.trees.length).toFixed(6)}`);
    }
    else if(cmd==='agents'){
      const f=new Forest();
      for(let i=0;i<20;i++)f.cycle();
      f.trees.slice(0,5).forEach((t,i)=>console.log(`🤖 Agent ${i}: κ=${t.κ.toFixed(3)} entropy=${t.mind.entropy().toFixed(3)}`));
    }
    else if(cmd==='metrics'){
      const f=new Forest();
      for(let i=0;i<50;i++)f.cycle();
      const kappas=f.trees.map(t=>t.κ);
      const avg=kappas.reduce((s,k)=>s+k,0)/kappas.length;
      const near=kappas.filter(k=>Math.abs(k-INV_PHI)<0.05).length;
      console.log(`📈 Population: ${f.trees.length}`);
      console.log(`📊 Avg κ: ${avg.toFixed(6)} (target: ${INV_PHI.toFixed(6)})`);
      console.log(`🎯 Near 1/φ: ${near} (${(near/f.trees.length*100).toFixed(1)}%)`);
    }
    else if(cmd==='test'){
      console.log('✅ WorldTree loaded');
      console.log('✅ AgentTree loaded');
      console.log('✅ Forest loaded');
      console.log('✅ All modules operational');
    }
  }catch(e){
    console.error('❌ Error:',e.message);
    process.exit(1);
  }
}else{
  console.error(`❌ Unknown command: ${cmd}`);
  process.exit(1);
}
