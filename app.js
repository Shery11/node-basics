console.log("Starting the app");
// for local storage
var storage = require("node-persist");
// init storage
storage.initSync();

// for encryption
var crypto = require('crypto-js');


// for accepting command line inputs
var argv = require('yargs')
.command('create','create user account',function(yargs){
   
   yargs.options({
   	 name: { 
   	 demand: true,
   	 alias : 'n',
   	 description : 'Enter account name',
   	 type :'string'
    },
	userName :{
	  	demand:true,
	  	alias : 'u',
	  	description: 'Choose username name',
	  	type : 'string'
	  },
	  password :{
	  	demand:true,
	  	alias : 'p',
	  	description: 'your last name',
	  	type : 'string'
	  },
	  masterPassword:{
	  	demand:true,
	  	alias:'m',
	  	description:'This is the master password you have to provide',
	  	type:'string'
	   }	


   }).help()

})
.command('get','Get user account',function(yargs){
	yargs.options({

	name : {
		demand : true,
		alias : 'n',
		description : 'Name of account ',
		type : 'string'
     },
     masterPassword:{
	  	demand:true,
	  	alias:'m',
	  	description:'This is the master password you have to provide',
	  	type:'string'

	  }

    }).help()
  
  }).help().argv

function getAccounts(masterPassword){
   
    var encryptedAccounts = storage.getItemSync('accounts');
    var accounts = [];
	
	if(typeof encryptedAccounts !== 'undefined'){

        var bytes = crypto.AES.decrypt(encryptedAccounts,masterPassword);
	    accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));

   	}


    return accounts; 





}

function saveAccounts(accounts,masterPassword){
      
       var arrayString = JSON.stringify(accounts);
       var enctyptedAccounts = crypto.AES.encrypt(arrayString,masterPassword);
       storage.setItemSync('accounts',enctyptedAccounts.toString());
       return accounts;


}
function createAccount(account,masterPassword){
	
	var accounts = getAccounts(masterPassword);
	accounts.push(account);

	saveAccounts(accounts,masterPassword); 
    return account; 
}


function getAccount(accountName,masterPassword){
    var accounts = getAccounts(masterPassword);
	 var matched; 

   accounts.forEach(function(data){
       
       if(data.name === accountName){
       	 matched = data;
       }

	});

	return matched;

}

var command = argv._[0];

if(command === 'create'){

	var account = {

		name:argv.n,
		userName:argv.u,
		password:argv.p
		
	}

	var newAccount =  createAccount(account,argv.masterPassword);

   

}else if(command === 'get'){

	var account = getAccount(argv.name,argv.masterPassword);

     if(typeof account != 'undefined'){
     	console.log(account);
     }else{
     	console.log('Account not found');
     }


}




