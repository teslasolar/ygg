#!/usr/bin/env node
/*<!--
# Explorer Agent
High creativity agent optimized for exploration

## Features
- Enhanced dream() function
- Higher ψ (creativity amplifier)
- More frequent branching
- Explores κ space more widely

## DNA Profile
κ: 0.5-0.7 (wide range)
ψ: 1.5 (high creativity)
Ω: dream (exploration mode)
-->*/

const fs=require('fs'),path=require('path');

function loadMD(n){
  const c=fs.readFileSync(path.join(__dirname,n),'utf8').match(/\/\*<!--[\s\S]*?-->\*\/([\s\S]*)/)[1];
  const m={exports:{}};
  new Function('module','exports','require','__dirname','__filename',c)(m,m.exports,require,__dirname,__filename);
  return m.exports;
}

const AgentTree=loadMD('ag.md');
const PHI=(1+Math.sqrt(5))/2;
const INV_PHI=1/PHI;

class ExplorerAgent extends AgentTree{
  constructor(){
    super();
    this.κ=0.5+Math.random()*0.2;
    this.ψ=1.5;
    this.Ω='dream';
    this.r=80;
  }

  decide(){
    const actions=['PHOTOSYNTHESIZE','REST','BRANCH','FRUIT','SHARE'];
    const probs=[0.3,0.1,0.3,0.2,0.1]; // More branching/fruiting
    const r=Math.random();
    let sum=0;
    for(let i=0;i<probs.length;i++){
      sum+=probs[i];
      if(r<sum)return actions[i];
    }
    return 'DREAM';
  }

  explore(){
    this.κ+=Math.random()*0.1-0.05;
    this.κ=Math.max(0.3,Math.min(0.8,this.κ));
    return this.mind.dream();
  }
}

module.exports=ExplorerAgent;

if(require.main===module){
  const agent=new ExplorerAgent();
  console.log('🔍 Explorer Agent');
  console.log(`κ: ${agent.κ.toFixed(3)}`);
  console.log(`ψ: ${agent.ψ}`);
  console.log(`Ω: ${agent.Ω}`);
  console.log(`Exploration value: ${agent.explore().toFixed(3)}`);
}
