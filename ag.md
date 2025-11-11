#!/usr/bin/env node
/*<!--
# AgentTree
Self-organizing agent with photosynthesis, branching, and fruiting

## Actions
- photosynthesize() - Energy production (peaks at κ=1/φ)
- branch() - Create offspring
- fruit() - Generate variant
- decide() - Markov chain decision-making
-->*/

const fs=require('fs'),path=require('path');

function loadMD(name){
  const code=fs.readFileSync(path.join(__dirname,name),'utf8').match(/\/\*<!--[\s\S]*?-->\*\/([\s\S]*)/)[1];
  const m={exports:{}};
  new Function('module','exports','require','__dirname','__filename',code)(m,m.exports,require,__dirname,__filename);
  return m.exports;
}

const WorldTree=loadMD('wt.md');

const PHI=(1+Math.sqrt(5))/2;
const INV_PHI=1/PHI;

class AgentTree extends WorldTree{
  photosynthesize(){
    let base=this.κ*10*this.mind.focus();
    let bonus=this.mind.entropy()*PHI;
    let pack=1-Math.abs(this.κ-INV_PHI)/INV_PHI;
    return base*(1+bonus)*pack;
  }

  branch(){
    let child=new AgentTree(this.seed());
    child.κ+=Math.random()*0.1-0.05;
    child.κ=Math.max(0.1,Math.min(0.9,child.κ));
    child.n=this.β.length;
    this.β.push(child.n);
    return child;
  }

  fruit(){
    let f=new AgentTree(this.seed());
    f.κ=INV_PHI+(Math.random()-0.5)*0.2;
    f.κ=Math.max(0.1,Math.min(0.9,f.κ));
    f.ψ*=0.8+Math.random()*0.4;
    f.n=this.ƒ.length;
    this.ƒ.push(f.n);
    return f;
  }

  decide(){
    const actions=['PHOTOSYNTHESIZE','REST','BRANCH','FRUIT','SHARE'];
    const probs=[0.4,0.2,0.15,0.15,0.1];
    const r=Math.random();
    let sum=0;
    for(let i=0;i<probs.length;i++){
      sum+=probs[i];
      if(r<sum)return actions[i];
    }
    return 'REST';
  }

  grow(){
    super.grow();
    const action=this.decide();
    if(action==='PHOTOSYNTHESIZE'){
      this.r+=Math.floor(this.photosynthesize());
    }else if(action==='BRANCH'&&this.r>50&&this.β.length<5){
      this.r-=50;
      return{type:'branch',child:this.branch()};
    }else if(action==='FRUIT'&&this.r>30&&this.ƒ.length<10){
      this.r-=30;
      return{type:'fruit',child:this.fruit()};
    }
    return null;
  }
}

module.exports=AgentTree;
