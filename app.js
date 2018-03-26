
const _ = require('lodash');
const yargs = require('yargs');
const beautify=require('./beautify.js');
const filePath={
    describe:'path of the file',
    demand:true,
    alias:'p'
  };

const argv = yargs
.command('path','path of the file',{
  path:filePath,
}).help().argv;

var command = argv._[0];
if(command==='path'){
    console.log(argv.path);
var result=beautify.test(argv.path)
}



 

