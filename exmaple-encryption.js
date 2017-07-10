var crypto = require('crypto-js');

var secretMessage = {
  name : 'Andrew',
  secretName : '007'
};
var secretKey = '123abc';

var objString = JSON.stringify(secretMessage);


// var obj = JSON.parse(objString);

// encrypting message
var encryptedMessage = crypto.AES.encrypt(objString,secretKey);




// decrypt
var bytes = crypto.AES.decrypt(encryptedMessage,secretKey);
var decryptMessage = bytes.toString(crypto.enc.Utf8);

// console.log(decryptMessage);

var obj = JSON.parse(decryptMessage);
console.log(obj.secretName);

console.log(typeof obj);