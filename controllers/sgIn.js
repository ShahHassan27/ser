const handlesgin = (mydata,bcrypt,saltRounds) => (req,res) => {
	const {email,password}=req.body;
	if (!email || !password ){
		return res.status(400).json('incorrect form submission');
	}
	mydata.select('email','hash').from('login')
		.where('email','=',email)
		.then(dat => {
			const isValid = bcrypt.compareSync(password,dat[0].hash);
			if (isValid){
				return mydata.select('*').from('users')
				.where('email','=',req.body.email)
				.then(uzer =>{
					res.json(uzer[0])
				})
					.catch(err => res.status(400).json('unable to get user'))
			} else {
				res.status(400).json('wrong credentials')
			}
		})
			.catch(err => res.status(400).json('wrong credentials'))
	/* if (req.body.email===database.users[0].email&&
		req.body.password===database.users[0].password)	{res.json(database.users[0])} else{
			res.status(400).json('error logging in');} */
}

module.exports = {
	handlesgIn:handlesgin
};