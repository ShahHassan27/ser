const handlepro = (req,res,mydata)=>{
	const {id}=req.params;
	/* let found=false; (no need with database)
	database.users.forEach(user=>{
		if (user.id===id){
			found=true;
			return res.json(user);
		}
	})
	*/
	mydata.select('*').from('users').where({
		id /* ES6 since property and value is same
		id : id */
	}) .then(wser =>{
		if(wser.length){
			res.json(wser[0]);
		}else{
			res.status(400).json('Not found')
		}		
	})
	.catch(err => res.status(400).json('error getting user'))
	 /* if (!found){
		res.status(404).json('No user exist by this id');
	} */
}

module.exports = {
	handlePro:handlepro // we can avoid repetition using es6 just use handlePro see how i do the image file
};