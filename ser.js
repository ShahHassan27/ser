const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const reg = require('./controllers/reg');
const sgIn = require('./controllers/sgIn');
const prof = require('./controllers/profile');
const img = require('./controllers/image');

var knex = require('knex')

const mydata = knex({
  client: 'pg',
  connection: {
    host : 'postgresql-rigid-11361',
    user : 'postgres',
    password : '9145',
    database : 'fd'
  }
});
// mydata.select('*').from('login').then(dta =>{console.log(dta);});
const app = express();
app.use(bodyParser.json());
app.use(cors())
 /*const database = {
	users :[
	{
		id: '1',
		name: 'Hassan',
		password: 'ahmed',
		email: 'hsan@gmail.com',
		entries: 0,
		joined: new Date()
	},
	{
		id: '2',
		name: 'Saminah',
		password: 'sa',
		email: 'mobi@gmail.com',
		entries: 0,
		joined: new Date()
	}
	]}*/
 app.get('/',(req,res)=>{res.send('It is working');})
app.post('/signin',sgIn.handlesgIn(mydata,bcrypt,saltRounds)) // shortcut
app.post('/register',(req,res) => {reg.handleReg(req,res,mydata,bcrypt,saltRounds)}) /* injecting dependencies [app.post('/register',(req,res) => {reg.handleReg(req,res,mydata,bcrypt)}] */
app.get('/profile/:id',(req,res) => {prof.handlePro(req,res,mydata)})
app.put('/image',(req,res) => {img.handleImg(req,res,mydata)})
app.post('/imageUrl',(req,res) => {img.handleApi(req,res)})
app.listen(process.env.PORT||3000,()=>{
	console.log(`App is on {process.env.PORT}`);
})