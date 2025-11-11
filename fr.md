#!/usr/bin/env node
/*<!--
# Forest Ecosystem
Multi-agent system with pollination, mycorrhizal networks, and evolution

## Operations
- cycle() - Run one season
- pollinate() - Genetic crossover
- connectRoots() - Resource sharing
- evolve() - Natural selection
-->*/

const fs=require('fs'),path=require('path');

function loadMD(name){
  const code=fs.readFileSync(path.join(__dirname,name),'utf8').match(/\/\*<!--[\s\S]*?-->\*\/([\s\S]*)/)[1];
  const m={exports:{}};
  new Function('module','exports','require','__dirname','__filename',code)(m,m.exports,require,__dirname,__filename);
  return m.exports;
}

const AgentTree=loadMD('ag.md');

const PHI=(1+Math.sqrt(5))/2;
const INV_PHI=1/PHI;

class Forest{
  constructor(){
    this.trees=[new AgentTree()];
    this.season=0;
    this.history=[];
  }

  cycle(){
    this.season++;
    let newTrees=[];

    this.trees.forEach(t=>{
      const result=t.grow();
      if(result){
        newTrees.push(result.child);
      }
    });

    this.trees.push(...newTrees);

    if(this.season%3===0)this.pollinate();
    if(this.season%5===0)this.connectRoots();
    if(this.season%Math.ceil(PHI*PHI)===0)this.evolve();

    this.history.push({
      season:this.season,
      population:this.trees.length,
      avgKappa:this.trees.reduce((s,t)=>s+t.κ,0)/this.trees.length
    });
  }

  pollinate(){
    if(this.trees.length<2)return;
    for(let i=0;i<Math.min(3,this.trees.length/5);i++){
      const a=this.trees[Math.floor(Math.random()*this.trees.length)];
      const b=this.trees[Math.floor(Math.random()*this.trees.length)];
      if(a!==b&&a.r>40&&b.r>40){
        const child=new AgentTree();
        child.κ=(a.κ+b.κ)/2+(Math.random()-0.5)*0.05;
        child.ψ=(a.ψ+b.ψ)/2;
        a.r-=20;
        b.r-=20;
        this.trees.push(child);
      }
    }
  }

  connectRoots(){
    this.trees.forEach(t=>{
      const nearby=this.trees.filter(o=>o!==t&&Math.abs(o.κ-t.κ)<0.05);
      if(nearby.length>0&&t.r>10){
        nearby.forEach(n=>{
          const share=5;
          t.r-=share;
          n.r+=share;
        });
      }
    });
  }

  evolve(){
    const sorted=this.trees.sort((a,b)=>b.mind.entropy()-a.mind.entropy());
    const keep=Math.ceil(sorted.length*0.7);
    this.trees=sorted.slice(0,keep);
  }
}

module.exports=Forest;
