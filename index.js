require('./out/runtime/package');
system.import('mioc/main').catch(function(e){
    console.error(e.stack);
    process.exit(1);
});