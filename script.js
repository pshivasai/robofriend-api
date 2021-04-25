const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const { Client }= require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});
client.connect();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const qs = `
SELECT *
FROM users
`;

// users = []

// client.query(query, (err, res) => {
//     for (let row of res.rows) {
//        users.push(row)
//     }
// });

// app.get('/',(req,res) => {
// 	client.query(query, (err, result) => {
//        for (let row of result.rows) {
//       		let user = []
//       		user.push(row)
//       		res.send(user)
//     }
// 	})
// })

app.get('/',(req,res) => {
	client.query(qs, (err, result) => {
      	res.send(result.rows)
	})
})



app.post('/addme', (req,res) => {
	const { name } = req.body
	client.query(`INSERT INTO users (name)
	VALUES ('${name}')`)
	res.send('success')
})


app.listen(3000, () =>{
	console.log('app is working on port 3000')
});



/*
/ -- res = this is working
/addme --> POSt = name
/update --> PUT = add new name card

*/