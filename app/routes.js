module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
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
      db.collection('comments').find().toArray((err, result) => {
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
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            messages: result,
            comments: result
          })
        })
        db.collection('comments').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('profile.ejs', {
            user : req.user,
            comments: result,
            messages: result
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
    app.get('/stage', isLoggedIn, function(req, res) {
        db.collection('messages').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('stage.ejs', {
            user : req.user,
            comments: result,
            messages: result
          })
        })
        db.collection('comments').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('stage.ejs', {
            user : req.user,
            comments: result,
            messages: result

          })
        })
    });


    //COMMENTS
    app.get('/comments', isLoggedIn, function(req, res) {
        db.collection('comments').find().toArray((err, result) => {
          if (err) return console.log(err)
          res.render('comments.ejs', {
            user : req.user,
            comments: result
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

    // app.post('/comments', (req, res) => {
    //   db.collection('messages').save({msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    //     if (err) return console.log(err)
    //     console.log('saved to database')
    //     res.redirect('/stage')
    //   })
    // })

    app.put('/messages', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
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

    app.put('/messagesTwo', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbDown:req.body.thumbDown + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.put('/msg', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({ msg: req.body.msg}, {
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

    app.put('/msgTwo', (req, res) => {
      db.collection('messages')
      .findOneAndUpdate({msg: req.body.msg}, {
        $set: {
          thumbDown:req.body.thumbDown + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })


    //create borad
    app.post('/create', (req, res) => {
      db.collection('messages').save({tag: req.body.tag, dicuss: req.body.dicuss, background: req.body.background, thumbUp: 0, thumbDown:0}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/stage')
      })
    })

    // Stage
    app.post('/comments', (req, res) => {
      db.collection('comments').save({msg: req.body.msg, side: req.body.side, thumbUp: 0, thumbDown:0}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/stage')
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
