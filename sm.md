#!/usr/bin/env node
/*<!--
# State Machine
Yggdrasil lifecycle and error management

## States
UNINITIALIZED→LOADING→CHECKING_DEPS→INITIALIZING→READY→RUNNING→PAUSED
                          ↓               ↓
                      FALLBACK         ERROR

## Features
- Global error capture
- Dependency checking
- Automatic recovery
- GitHub Pages detection
-->*/

class YggStateMachine{
  constructor(name){
    this.name=name;
    this.state='UNINITIALIZED';
    this.states={
      UNINITIALIZED:{next:['LOADING']},
      LOADING:{next:['CHECKING_DEPS','ERROR']},
      CHECKING_DEPS:{next:['INITIALIZING','FALLBACK','ERROR']},
      INITIALIZING:{next:['READY','ERROR']},
      FALLBACK:{next:['READY','ERROR']},
      READY:{next:['RUNNING','ERROR']},
      RUNNING:{next:['PAUSED','ERROR']},
      PAUSED:{next:['RUNNING','ERROR']},
      ERROR:{next:['LOADING','FALLBACK']}
    };
    this.errors=[];
    this.logs=[];
    this.start=Date.now();
    this.metrics={transitions:0,errors:0,warnings:0};
    this.isGitHub=(typeof window!=='undefined'&&(window.location.hostname.includes('github.io')||window.location.hostname.includes('github.com')));
  }

  transition(to,data={}){
    const valid=this.states[this.state]?.next||[];
    if(!valid.includes(to)){
      this.log('warn',`Invalid: ${this.state}→${to}`);
    }
    const from=this.state;
    this.state=to;
    this.metrics.transitions++;
    this.log('info',`${from}→${to}`,data);
  }

  log(level,msg,data){
    const entry={t:Date.now()-this.start,level,msg,data};
    this.logs.push(entry);
    if(level==='error'){
      this.errors.push(entry);
      this.metrics.errors++;
    }else if(level==='warn')this.metrics.warnings++;

    if(typeof console!=='undefined'){
      const emoji={'error':'❌','warn':'⚠️','info':'ℹ️','success':'✅'}[level]||'📝';
      console.log(`${emoji} [${this.name}:${this.state}] ${msg}`,data||'');
    }
    if(this.logs.length>100)this.logs.shift();
  }

  async init(fn){
    try{
      this.transition('LOADING');
      this.transition('CHECKING_DEPS');
      await fn();
      this.transition('READY');
      return true;
    }catch(e){
      this.log('error','Init failed',e.message);
      this.transition('ERROR');
      return false;
    }
  }

  getMetrics(){
    return{...this.metrics,uptime:((Date.now()-this.start)/1000).toFixed(2)+'s',state:this.state};
  }
}

function createStateMachine(name){
  const sm=new YggStateMachine(name);
  if(typeof window!=='undefined'){
    window.YggStateMachines=window.YggStateMachines||{};
    window.YggStateMachines[name]=sm;
  }
  return sm;
}

if(typeof module!=='undefined')module.exports={YggStateMachine,createStateMachine};
