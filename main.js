const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

let app = express();
let port = 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'adarsh'
})

db.connect((err)=>{
    if(err) throw err;
    else{
        console.log('Database Connected')
    }
})

app.get('/home', (req, res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.post('/save', (req, res)=>{
    let name = req.body.name;
    let contect = req.body.contect;
    let email = req.body.email

    let value = [[name, contect, email]]
    let sql = 'insert into adarsh (name, contect, email) value ?'

    db.query(sql, [value], (err, result)=>{
        if(err) throw err;
        else{
            res.send('Data Saved')
        }
    })
})

app.get('/getData',(req,res) =>{
    let sql = "select * from adarsh"
    db.query(sql,(err,result) =>{
        if(err) throw err;
        else{

            res.json(result)
        }
    })
})

app.delete("/deleteData/:name" ,(req,res) =>{
    let id = req.params.name
    let sql="delete from adarsh where name = ?"
    db.query(sql,[id],(err,result) =>{
        if(err) throw err;
        else{
            res.send("data delete")
        }
    })
});

app.put("/updateData/:id" ,(req,res) =>{
    let id = req.params.id
    let newData = req.body
    const sql ="update adarsh set ? where id = ?"
    db.query(sql,[newData,id],(err,result) =>{
        if(err) throw err
        else{
            res.send("update data")
        }
    })
});


app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`)
})