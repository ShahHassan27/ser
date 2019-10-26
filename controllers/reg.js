const handlereg = (req,res,mydata,bcrypt,saltRounds)=>{ // injecting dependencies [const handlereg = (req,res,mydata,bcrypt)=>{]
	const {email,name,password}=req.body;
	if (!email || !name || !password ){
		return res.status(400).json('incorrect form submission');
	}
	/* replacing with mydata
	database.users.push({
		id: '3',
		name: name,
		email: email,
		/* removing it for security
		password: password,
		*//*
		entries: 0,
		joined: new Date()
	})
	*/
	const hash = bcrypt.hashSync(password,saltRounds);
	// creating a transaction
	mydata.transaction(trx =>{
		trx.insert({
			hash : hash,
			email : email
		})
		.into('login')
		.returning('email')
		.then(logEmail => {
		return	trx('users')
		.returning('*')
		.insert({
			name: name,
			email: logEmail[0],
			joined: new Date()
		}).then(ourUser => {
			res.json(ourUser[0]);
		})
	})
		.then(trx.commit)
		.catch(trx.rollback)
		
	}).catch(err => res.status(400).json('Unable to register'))
	
}

module.exports = {
	handleReg:handlereg
};