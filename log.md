#!/usr/bin/env node
/*<!--
# Logger
Logging utility for Yggdrasil (<250 tokens)

## Usage
```javascript
const log = require('./log.md');
log.info('Message');
log.error('Error');
log.success('Done');
```

## Levels
- error (red) - Errors
- warn (yellow) - Warnings
- info (blue) - Information
- success (green) - Success
- debug (gray) - Debug info

## Commands
- `node log.md view` - View recent logs
- `node log.md clear` - Clear log file
-->*/

const fs=require('fs'),path=require('path');

const LOG_FILE=path.join(__dirname,'ygg.log');
const colors={
  error:'\x1b[31m',
  warn:'\x1b[33m',
  info:'\x1b[36m',
  success:'\x1b[32m',
  debug:'\x1b[90m',
  reset:'\x1b[0m'
};

function write(level,msg){
  const ts=new Date().toISOString();
  const entry=`[${ts}] ${level.toUpperCase()}: ${msg}\n`;
  fs.appendFileSync(LOG_FILE,entry);
  const col=colors[level]||colors.reset;
  console.log(`${col}${entry.trim()}${colors.reset}`);
}

class Logger{
  error(msg){write('error',msg);}
  warn(msg){write('warn',msg);}
  info(msg){write('info',msg);}
  success(msg){write('success',msg);}
  debug(msg){write('debug',msg);}
}

if(require.main===module){
  const[cmd]=process.argv.slice(2);
  if(cmd==='view'){
    if(fs.existsSync(LOG_FILE)){
      const logs=fs.readFileSync(LOG_FILE,'utf8').split('\n').slice(-20);
      console.log('📋 Recent Logs:\n');
      logs.forEach(l=>l&&console.log(l));
    }else{
      console.log('No logs found');
    }
  }else if(cmd==='clear'){
    fs.writeFileSync(LOG_FILE,'');
    console.log('✅ Logs cleared');
  }else{
    console.log('Usage: node log.md [view|clear]');
  }
}

module.exports=new Logger();
