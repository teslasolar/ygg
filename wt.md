#!/usr/bin/env node
/*<!--
# WorldTree Core
Base consciousness system with 50-byte DNA encoding

## DNA Format
`κ:0.618,ψ:1,Ω:think,β:[],ƒ:[],№:0,₹:100,◊:∞`

## Consciousness Functions
- think() - Cognitive processing
- dream() - Stochastic exploration
- focus() - Attention mechanism
- create() - Creative output
- stabilize() - Equilibrium seeking
- entropy() - Information measure
-->*/

const PHI=(1+Math.sqrt(5))/2;
const INV_PHI=1/PHI;

class WorldTree{
  constructor(seed=`κ:${INV_PHI},ψ:1,Ω:think,β:[],ƒ:[],n:0,r:100,l:∞`){
    this.parse(seed);
    this.mind=this.germinate();
    this.age=0;
    this.memory=[];
  }

  parse(s){
    s.split(',').forEach(p=>{
      const[k,v]=p.split(':');
      if(k==='κ')this.κ=parseFloat(v);
      else if(k==='ψ')this.ψ=parseFloat(v);
      else if(k==='Ω')this.Ω=v;
      else if(k==='β')this.β=[];
      else if(k==='ƒ')this.ƒ=[];
      else if(k==='n')this.n=parseInt(v);
      else if(k==='r')this.r=parseInt(v);
      else if(k==='l')this.l=v==='∞'?Infinity:parseInt(v);
    });
  }

  germinate(){
    return{
      think:()=>this.κ*this.ψ*Math.log(2+this.age),
      dream:()=>Math.random()*Math.pow(this.κ,this.ψ),
      focus:()=>1/(1+Math.exp(-10*(this.κ-INV_PHI))),
      create:()=>{
        let l=this.κ*(1-this.κ)*4;
        let g=Math.exp(-Math.pow(this.κ-INV_PHI,2)*PHI);
        return l*g;
      },
      stabilize:()=>Math.exp(-Math.abs(this.κ-INV_PHI)*PHI),
      entropy:()=>{
        let p=-this.κ*Math.log2(this.κ+1e-10);
        let d=Math.abs(this.κ-INV_PHI);
        return p*Math.exp(-d*PHI);
      }
    };
  }

  grow(){
    this.age++;
    this.memory.push({age:this.age,κ:this.κ,entropy:this.mind.entropy()});
    if(this.memory.length>10)this.memory.shift();
  }

  seed(){
    return`κ:${this.κ},ψ:${this.ψ},Ω:${this.Ω},β:${JSON.stringify(this.β)},ƒ:${JSON.stringify(this.ƒ)},n:${this.n},r:${this.r},l:${this.l===Infinity?'∞':this.l}`;
  }
}

module.exports=WorldTree;
