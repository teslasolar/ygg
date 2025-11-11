#!/usr/bin/env node
/*<!--
# Yggdrasil API Server
REST API for Project Yggdrasil (<250 tokens)

## Endpoints
- GET /health - Health check
- GET /forest - Get forest state
- POST /forest/cycle - Run N cycles
- GET /agents - List all agents
- GET /agents/:id - Get agent by index
- GET /metrics - Convergence metrics
- GET /config - Get configuration
- POST /config - Update config

## Usage
```bash
node api.md [port]
# Default: http://localhost:3618 (φ*1000+1000)
```
-->*/

const http=require('http'),fs=require('fs'),path=require('path');

function loadMD(n){
  const c=fs.readFileSync(path.join(__dirname,n),'utf8').match(/\/\*<!--[\s\S]*?-->\*\/([\s\S]*)/)[1];
  const m={exports:{}};
  new Function('module','exports','require','__dirname','__filename',c)(m,m.exports,require,__dirname,__filename);
  return m.exports;
}

const Forest=loadMD('fr.md');
const cfg=loadMD('cfg.md');
const calc=loadMD('calc.md');

const PHI=(1+Math.sqrt(5))/2;
const PORT=process.argv[2]||Math.floor(PHI*1000+1000);

let forest=new Forest();

const routes={
  'GET /health':()=>({status:'ok',version:'2.0.0',phi:PHI}),
  'GET /forest':()=>({season:forest.season,population:forest.trees.length,trees:forest.trees.map(t=>({κ:t.κ,ψ:t.ψ,age:t.age,r:t.r}))}),
  'POST /forest/cycle':(body)=>{
    const n=body.cycles||1;
    for(let i=0;i<n;i++)forest.cycle();
    return{season:forest.season,population:forest.trees.length};
  },
  'GET /agents':()=>forest.trees.map((t,i)=>({id:i,κ:t.κ,entropy:t.mind.entropy()})),
  'GET /agents/:id':(body,params)=>{
    const t=forest.trees[params.id];
    return t?{κ:t.κ,ψ:t.ψ,age:t.age,r:t.r,seed:t.seed(),entropy:t.mind.entropy()}:{error:'Not found'};
  },
  'GET /metrics':()=>{
    const kappas=forest.trees.map(t=>t.κ);
    return{population:forest.trees.length,mean:calc.mean(kappas),median:calc.median(kappas),stddev:calc.stddev(kappas),converged:calc.convergence(kappas)};
  }
};

http.createServer((req,res)=>{
  const url=req.url.split('?')[0];
  const key=`${req.method} ${url}`;
  const paramMatch=url.match(/\/agents\/(\d+)/);
  const route=paramMatch?routes['GET /agents/:id']:routes[key];

  if(route){
    let body='';
    req.on('data',chunk=>body+=chunk);
    req.on('end',()=>{
      try{
        const data=body?JSON.parse(body):{};
        const params=paramMatch?{id:parseInt(paramMatch[1])}:{};
        const result=route(data,params);
        res.writeHead(200,{'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
        res.end(JSON.stringify(result));
      }catch(e){
        res.writeHead(500);
        res.end(JSON.stringify({error:e.message}));
      }
    });
  }else{
    res.writeHead(404);
    res.end(JSON.stringify({error:'Not found',available:Object.keys(routes)}));
  }
}).listen(PORT,()=>console.log(`🌳 Yggdrasil API running on http://localhost:${PORT}`));
