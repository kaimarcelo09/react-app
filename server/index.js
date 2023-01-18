const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')
const app = express()
const PORT = process.env.PORT || 3030;

//connect to database
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "contactsdb"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//get data
app.get("/contacts/get", (req, res) => {

    const sqlSelect = "SELECT * FROM contacts_table";
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    })
})


//insert data
app.post("/contacts/post", (req, res) => {

    const name = req.body.contactName;
    const num = req.body.contactNum;

    const sqlInsert = "INSERT INTO contacts_table (contactName, contactNum) VALUES (?,?)";
    db.query(sqlInsert, [name, num], (err, result) => {
        if (err) console.log(err);
    })
})

//delete data 
app.delete("/contacts/delete/:id", (req, res) => {

    const id = req.params.id;
    const sqlDelete = "DELETE FROM contacts_table WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err)
    })
})

//update data 
app.put("/contacts/update", (req, res) => {

    const id = req.body.id
    const num = req.body.contactNum
    const sqlUpdate = "UPDATE contacts_table SET contactNum = ? WHERE id = ?";
    db.query(sqlUpdate, [num, id], (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//test if port is running and connected to DB
// app.get('/', (req, res) => {
   
//     const sqlInsert = "INSERT INTO contacts_table (contactName, contactNum) VALUES ('Juan Dela Cruz', '09123456789')"
//     db.query(sqlInsert, () => {
//         res.send("data posted")
//     })
// })


//3001 = port 
app.listen(3001, () => {
    console.log(`server started on port ${PORT}`)
})