var argv = require('yargs').command('hello','Greets the user',function(yargs){
   yargs.options({
      name:{
      	demand : true, //yargs make sure this is must
         alias : 'n', //shotcut for the full name
         desctiption : 'your first name goes here',
         type : 'string'
      },
      lastName :{
      	demand:true,
      	alias : 'l',
      	desctiption: 'your last name',
      	type : 'string'
      }
   }).help('help');
}).help('help')
.argv;

var command = argv._[0];


if(command === 'hello' && typeof argv.name !== 'undefined' && typeof argv.lastName !== 'undefined' ){
	console.log('Hello ' + argv.name +' '+ argv.lastName);
}else if(command === 'hello' && typeof argv.name !== 'undefined'){
	console.log('Heloo '+ argv.name  );
}else if(command === 'hello'){
	console.log('Heloo world');
}
