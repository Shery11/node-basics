
function doWork(){
	// throw Error('Unnable to do work')
     console.log("i am working")
}

try{
 doWork();
}catch(e){
	console.log(e.message);
}finally{
   console.log('finally executed')
}

console.log('After error');