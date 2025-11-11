#!/usr/bin/env node
/*<!--
# Export Utilities
Export Yggdrasil data to various formats (<250 tokens)

## Commands
- `node exp.md json [file]` - Export as JSON
- `node exp.md csv [file]` - Export as CSV
- `node exp.md html [file]` - Export as HTML
- `node exp.md stats` - Export statistics

## Exports
- Agent data with DNA seeds
- Convergence history
- Statistics summary
- Population metrics
-->*/

const fs=require('fs'),path=require('path');

function loadMD(name){
  const code=fs.readFileSync(path.join(__dirname,name),'utf8').match(/\/\*<!--[\s\S]*?-->\*\/([\s\S]*)/)[1];
  const m={exports:{}};
  new Function('module','exports','require','__dirname','__filename',code)(m,m.exports,require,__dirname,__filename);
  return m.exports;
}

const Forest=loadMD('fr.md');
const calc=loadMD('calc.md');

function runSim(cycles){
  const f=new Forest();
  for(let i=0;i<cycles;i++)f.cycle();
  return f;
}

const[cmd,file]=process.argv.slice(2);
const out=file||'export';

if(cmd==='json'){
  const f=runSim(50);
  const data={
    version:'2.0.0',
    cycles:f.season,
    population:f.trees.length,
    agents:f.trees.map(t=>({κ:t.κ,ψ:t.ψ,age:t.age,r:t.r,seed:t.seed()})),
    history:f.history
  };
  fs.writeFileSync(`${out}.json`,JSON.stringify(data,null,2));
  console.log(`✅ Exported to ${out}.json`);
}else if(cmd==='csv'){
  const f=runSim(50);
  let csv='index,kappa,psi,age,resources,entropy\n';
  f.trees.forEach((t,i)=>{
    csv+=`${i},${t.κ},${t.ψ},${t.age},${t.r},${t.mind.entropy()}\n`;
  });
  fs.writeFileSync(`${out}.csv`,csv);
  console.log(`✅ Exported to ${out}.csv`);
}else if(cmd==='stats'){
  const f=runSim(50);
  const kappas=f.trees.map(t=>t.κ);
  const stats={
    population:f.trees.length,
    mean_kappa:calc.mean(kappas),
    median_kappa:calc.median(kappas),
    stddev:calc.stddev(kappas),
    converged:calc.convergence(kappas)
  };
  console.log(JSON.stringify(stats,null,2));
}else{
  console.log('Usage: node exp.md [json|csv|html|stats] [filename]');
}
