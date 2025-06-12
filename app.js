const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');

// MongoDB connect
const db = require('./server');
const mongodb = require('mongodb');

// 1: Kirish code
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// 2: Session code
app.use(session({
  secret: 'Jay@12345', 
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } 
}));


// 3: Views code
app.set('views', 'views');
app.set('view engine', 'ejs');

// 4: Routing code

// Register
app.get('/register', (req, res) => {
    res.render('register');
});

// Login
app.get('/login', (req, res) => {
    res.render('login');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// User register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ username, password: hashed });
  res.redirect('/login');
});

// User logIn
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await db.collection('users').findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = { id: user._id, username: user.username };
      res.redirect('/');
    } else {
      res.send('Login or password is wrong');
  }
});

// Home page
app.get('/', requireLogin, function(req, res){
    db.collection('plans')
        .find({userId: req.session.user.id})
        .toArray((err, data) => {
            if(err){
                console.log(err);
                res.end("something wnet wrong");
            } else {
                res.render('reja', {items: data, session: req.session});
            }
    });
});

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

// Create
app.post('/create-item', requireLogin, (req, res) => {
    const new_reja = req.body.reja;
    db.collection('plans').insertOne({
      reja: new_reja,
      completed: false,
      userId: req.session.user.id},
      (err, data) => {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ error: "Failed to create item." });
          }
        res.json(data.ops[0]);
    });
});

// CheckBox
app.post('/checkbox-item', requireLogin, (req, res) => {
  const id = req.body.id;
  const completed = req.body.completed;
  db.collection('plans').updateOne(
    { _id: new mongodb.ObjectId(id) },
    { $set: { completed: completed } },
    (err) => {
      if (err) return res.status(500).json({ error: "Update failed" });
      res.json({ success: true });
    }
  );
});


// Delete
app.post('/delete-item', requireLogin, (req, res) => {
    const id = req.body.id;
    db.collection('plans').deleteOne({_id: new mongodb.ObjectId(id)}, function(err, data){
      if (err) return res.status(500).json({ error: "Delete failed" });
        res.json({state: 'Jay just do more'});
    })
})

// Update
app.post('/update-item', requireLogin, (req, res) => {
    const id = req.body.id;
    const value = req.body.reja
    db.collection('plans').updateOne(
        {_id: new mongodb.ObjectId(id)},
        {$set: {reja: value}}, function(err, data){
          if (err) return res.status(500).json({ error: "Update failed" });
          res.json({success: "done"});
    });
})

// Delete-all
app.post('/delete-all', requireLogin, (req, res) => {
    db.collection('plans').deleteMany({}, (err, data) => {
      if (err) return res.status(500).json({ error: "Delete-all failed" });
      res.json({success: "done"});
    });
})

module.exports = app;
