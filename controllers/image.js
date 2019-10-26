const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '1f2da7a4fd3542d1a4e44413de75345e'
});

const handleApi = (req,res) =>{
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=>{
		res.json(data);
	})
	.catch(err=>res.status(400).json('unable to work with Api'))
}

const handleImg = (req,res,mydata)=>{
	const {id}=req.body;
	mydata('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entry => {
		res.json(entry[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
	/*let found=false;
	database.users.forEach(user=>{
		if (user.id===id){
			found=true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if (!found){
		res.status(404).json('No entries found');
	}*/
}


module.exports = {
	handleImg, /*we can avoid repetition this is how*/
	handleApi
};