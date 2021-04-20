module.exports = function(app, passport, db, ObjectID) {
const {ObjectId} = require('mongodb');
// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
      db.collection('messages').find().sort({timestamp: -1}).toArray((err, recResult) => {
        if (err) return console.log(err)
        db.collection('messages').find().toArray((err, popResult) => {
          console.log(popResult[1].thumbUp)
          console.log(popResult.thumbUp)
          var postsByLikes = popResult.sort(function (postA, postB) {
            /** all the code above to sort the posts in the variable named `results` by Likes */
            const A_COMES_BEFORE_B = -1;
            const B_COMES_BEFORE_A = 1;
            console.log(postA.thumbUp, postB.thumbUp)

              if (postA.thumbUp > postB.thumbUp) {
                return A_COMES_BEFORE_B;
              } else {
                return B_COMES_BEFORE_A;
              }
          });
          console.log(postsByLikes)
          if (err) return console.log(err)
          res.render('index.ejs', {
            postsByLikes: postsByLikes,
            messages: recResult
          })
        })
      })
    });
    //explore
    app.get('/explore', function(req, res) {
        res.render('explore.ejs');
    });
    //Topic
    app.get('/topic', function(req, res) {
      db.collection('messages').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('topic.ejs', {
          user : req.user,
          messages: result,
          comments: result
        })
      })
    });
    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, msgResult) => {

          if (err) return console.log(err)
          db.collection('comments').find().toArray((err, comResult) => {
            if (err) return console.log(err)
            res.render('profile.ejs', {
              user : req.user,
              comments: comResult,
              messages: msgResult
            })
          })
        })

    });
    // Create Section
    app.get('/create', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('create.ejs', {
            user : req.user,
            messages: result
          })
        })
    });
    // Stage Section
    app.get('/stage/:msgId', isLoggedIn, function(req, res) {
        db.collection('messages').findOne({_id: ObjectId(req.params.msgId)},(err, msgResult) => {
          console.log(req.params.msgId, "msgid")
          if (err) return console.log(err)
          db.collection('comments').find({msgId: req.params.msgId}).toArray((err, comResult) => {
            if (err) return console.log(err)
            res.render('stage.ejs', {
              user : req.user,
              comments: comResult,
              message: msgResult
            })
          })
        })

    });


    //COMMENTS
    app.get('/comments/:msgId', isLoggedIn, function(req, res) {
        db.collection('comments').find({msgId: req.params.msgId}).toArray((err, comResult) => {
          if (err) return console.log(err)
          res.render('comments.ejs', {
            user : req.user,
            comments: comResult,
            msgId: req.params.msgId
          })
        })
    });

    //Explore
    // app.get('/explore', isLoggedIn, function(req, res) {
    //     db.collection('messages').find().toArray((err, result) => {
    //       if (err) return console.log(err)
    //       res.render('explore.ejs', {
    //         user : req.user,
    //         messages: result
    //       })
    //     })
    // });
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================

    //create borad
    app.post('/create', (req, res) => {
      console.log(req.body._id, "candy")
      let document =
      {userName: req.user.local.email,
      tag: req.body.tag,
       dicuss: req.body.dicuss,
       background: req.body.background,
       thumbUp: 0,
       timestamp: new Date}
      db.collection('messages').insertOne(document, (err, result) => {
        console.log(document)
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/stage/' + result.ops[0]._id)
      })
    })

    // Stage board
    app.post('/comments', (req, res) => {
      db.collection('comments').save({msg: req.body.msg, side: req.body.side, msgId: req.body.msgId, thumbUp: 0, timestamp: new Date}, (err, result) => {
        console.log(result)
        if (err) return console.log(err)
        console.log('saved to database', result)
        res.redirect('/stage/' + result.ops[0].msgId)
      })
    })

    app.put('/messages', (req, res) => {
      // console.log(req.body.postId, ObjectID(req.body.postId), "put")
      console.log(typeof req.body.postId)
      console.log(req.body.postId)
      console.log(req.body.thumbUp)
      db.collection('messages')
      .findOneAndUpdate({_id: ObjectID(req.body.postId)}, {
        $set: {
          thumbUp:req.body.thumbUp + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({tag: req.body.tag, dicuss: req.body.dicuss, background: req.body.background}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

    app.delete('/msgThree', (req, res) => {
      db.collection('comments').findOneAndDelete({msg: req.body.msg, side: req.body.side}, (err, result) => {
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
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
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

    res.redirect('/');
}
