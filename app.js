const express = require('express');
const app = express();
const fs = require('fs');
const client = require('./server');

let user;
fs.readFile("database/user.json", "utf-8", (err, data) => {
    if(err){
        console.log('ERROR:', err);
    } else {
        user = JSON.parse(data);
    }
});

// MongoDB connect
const db = require('./server');
const mongodb = require('mongodb');

// 1: Kirish code
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// 2: Session code

// 3: Views code
app.set('views', 'views');
app.set('view engine', 'ejs');

// 4: Routing code
// Create
app.post('/create-item', (req, res) => {
    console.log(req.body);
    const new_reja = req.body.reja;
   
    db.collection('plans').insertOne({reja: new_reja}, (err, data) =>{
        res.json(data.ops[0]);
    });
});

// Delete
app.post('/delete-item', (req, res) => {
    const id = req.body.id;
    db.collection('plans').deleteOne({_id: new mongodb.ObjectId(id)}, function(err, data){
        res.json({state: 'Jay just do more'});
    })
})

// Update
app.post('/update-item', (req, res) => {
    const id = req.body.id;
    const value = req.body.reja
    db.collection('plans').updateOne(
        {_id: new mongodb.ObjectId(id)},
        {$set: {reja: value}}
    );
    res.json({success: "done"});
})

// Delete-all
app.post('/delete-all', (req, res) => {
    db.collection('plans').deleteMany({});
    res.json({success: 'done'});
})

// render  resume
app.get('/author', function (req, res) {
    res.render('author', {user: user});
});

// home page
app.get('/', function(req, res){
    db.collection('plans')
        .find()
        .toArray((err, data) => {
            if(err){
                console.log(err);
                res.end("something wnet wrong");
            } else {
                res.render('reja', {items: data});
            }
    });
});

module.exports = app;
