const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Client }= require('pg');

const client = new Client({
   connectionString: process.env.DATABASE_URL,
   ssl: true
});

client.connect();

const app = express();

app.use(bodyParser.json());
app.use(cors());



app.put('/',(req,res) => {
	client.query( `SELECT * FROM users`, (err, result) => {
      	res.send(result.rows)
	})
});




app.post('/addme', (req,res) => {
	const { name } = req.body
	client.query(`INSERT INTO users (name)
	VALUES ('${name}')`)
  console.log(name)
	res.send('success')
})


app.listen(process.env.PORT, () =>{
	console.log(`app is working on port ${process.env.PORT}`)
});
