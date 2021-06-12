module.exports = function(app, passport, db, ObjectID) {
  const {
    ObjectId
  } = require('mongodb');
  const helpers = require('./helpers.js')
  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', isLoggedIn, function(req, res) {
    db.collection('messages').find().sort({
      timestamp: -1
    }).toArray((err, recResult) => {
      if (err) return console.log(err)
      db.collection('messages').find().toArray((err, popResult) => {

        var postsByLikes = popResult.sort(function(postA, postB) {
          /** all the code above to sort the posts in the variable named `results` by Likes */
          const A_COMES_BEFORE_B = -1;
          const B_COMES_BEFORE_A = 1;
          // console.log(postA.thumbUp, postB.thumbUp)

          if (postA.thumbUp > postB.thumbUp) {
            return A_COMES_BEFORE_B;
          } else {
            return B_COMES_BEFORE_A;
          }
        });
        console.log(postsByLikes.length)
        if (err) return console.log(err)
        res.render('index.ejs', {
          user: req.user,
          postsByLikes: postsByLikes,
          messages: recResult,
          helpers: helpers
        })
      })
    })
  });
  //explore
  app.get('/explore', function(req, res) {
    res.render('explore.ejs');
  });
  //Topic
  app.get('/topic/:topic', isLoggedIn, function(req, res) {
    let topicTag = req.params.topic
    console.log(req.params.topic, topicTag, "kuawii")
    db.collection('messages').find({
      tag: topicTag
    }).toArray((err, result) => {
      console.log(result, "dua")
      if (err) return console.log(err)
      res.render('topic.ejs', {
        user: req.user,
        messages: result,
        helpers: helpers
      })
    })
  });
  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, msgResult) => {
      if (err) return console.log(err)
      db.collection('comments').find().toArray((err, comResult) => {
        console.log(comResult.length)
        if (err) return console.log(err)
        res.render('profile.ejs', {
          user: req.user,
          comments: comResult,
          messages: msgResult,
          helpers: helpers
        })
      })
    })

  });
  // Create Section
  app.get('/create', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('create.ejs', {
        user: req.user,
        messages: result
      })
    })
  });
  // Stage Section
  app.get('/stage/:msgId', isLoggedIn, function(req, res) {
    db.collection('messages').findOne({
      _id: ObjectId(req.params.msgId)
    }, (err, msgResult) => {
      // console.log(msgResult, "hello")
      if (err) return console.log(err)
      db.collection('comments').find({
        msgId: req.params.msgId
      }).toArray((err, comResult) => {
        var comsByLikes = comResult.sort(function(comA, comB) {
          /** all the code above to sort the posts in the variable named `results` by Likes */
          const A_COMES_BEFORE_B = -1;
          const B_COMES_BEFORE_A = 1;
          // console.log(comA.thumbUp, comB.thumbUp)

          if (comA.thumbUp > comB.thumbUp) {
            return A_COMES_BEFORE_B;
          } else {
            return B_COMES_BEFORE_A;
          }
        });
        // console.log(comsByLikes)
        if (err) return console.log(err)
        res.render('stage.ejs', {
          user: req.user,
          comsByLikes: comsByLikes,
          message: msgResult,
          helpers: helpers
        })
      })
    })

  });


  //COMMENTS
  app.get('/comments/:msgId', isLoggedIn, function(req, res) {
    db.collection('comments').find({
      msgId: req.params.msgId
    }).toArray((err, comResult) => {
      if (err) return console.log(err)
      res.render('comments.ejs', {
        user: req.user,
        comments: comResult,
        msgId: req.params.msgId
      })
    })
  });
  // Followers
  app.get('/follow/:userId', isLoggedIn, function(req, res) {
    let userId = ObjectId(req.params.userId)
    console.log('butterfly', userId)
    db.collection('messages').find({
      followers: ObjectId(req.params.userId)
    }).toArray((err, result) => {
      console.log(result, "fish")
      if (err) return console.log(err)
      res.render('follow.ejs', {
        user: req.user,
        messages: result,
        helpers: helpers
      })
    })
  });

  app.get('/account', isLoggedIn, function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('account.ejs', {
        user: req.user
      })
    })
  });


  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // message board routes ===============================================================

  //create borad
  app.post('/create', (req, res) => {
    if (req.files) {
      console.log("usgai", req.files)
      var file = req.files.file
      var fileName = file.name
      console.log(fileName)
      file.mv('public/uploads/' + fileName, function(err) {
        if (err) {
          res.send(err)
        }
      })
    }
    db.collection('messages').insertOne({
      userName: req.user.local.username,
      tag: req.body.tag,
      dicuss: req.body.dicuss,
      background: req.body.background,
      img: "/uploads/" + fileName,
      thumbUp: 0,
      timestamp: new Date,
      followers: []
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/stage/' + result.ops[0]._id)
    })
  })


  // Stage board
  app.post('/comments', (req, res) => {
    db.collection('comments').save({
      userName: req.user.local.username,
      msg: req.body.msg,
      side: req.body.side,
      msgId: req.body.msgId,
      thumbUp: 0,
      timestamp: new Date
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database', result)
      res.redirect('/stage/' + result.ops[0].msgId)
    })
  })

  app.put('/messages', (req, res) => {
    db.collection('messages')
      .findOneAndUpdate({
        _id: ObjectID(req.body.postId)
      }, {
        $set: {
          thumbUp: req.body.thumbUp + 1
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })
  app.put('/cindy', (req, res) => {
    db.collection('comments')
      .findOneAndUpdate({
        _id: ObjectID(req.body.comId)
      }, {
        $set: {
          thumbUp: req.body.thumbUp + 1
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })
  app.put('/stage/bob', (req, res) => {
    db.collection('messages')
      .findOneAndUpdate({
        _id: ObjectID(req.body.postId)
      }, {
        $set: {
          thumbUp: req.body.thumbUp + 1
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })
  //greg = com
  app.put('/stage/greg', (req, res) => {
    db.collection('comments')
      .findOneAndUpdate({
        _id: ObjectID(req.body.comId)
      }, {
        $set: {
          thumbUp: req.body.thumbUp + 1
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  app.put('/follow/add', (req, res) => {
    let userId = req.user._id
    let user = ObjectId(userId)
    console.log('yellow')
    console.log(req.body.postId, user)
    db.collection('messages')
      .findOneAndUpdate({
        _id: ObjectID(req.body.postId)
      }, {
        $addToSet: {
          followers: user
        }
      }, {
        sort: {
          _id: -1
        },
        upsert: true
      }, (err, result) => {
        console.log(`this is my ${result}: userId = ${userId}`)
        if (err) return res.send(err)
        res.send(result)
        // res.redirect(303, '/follow/' + userId)
      })
  })

  app.delete('/messages', (req, res) => {
    console.log('friends')
    db.collection('messages').findOneAndDelete({
      _id: ObjectID(req.body.postId)
    }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })

  app.delete('/comments', (req, res) => {
    db.collection('comments').findOneAndDelete({
      _id: ObjectID(req.body.comId)
    }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })



  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/login');
}
