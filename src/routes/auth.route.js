const router    = require('express').Router();
const passport  = require('passport');
const path      = require('path');

// path: auth/

// GET /login
router.get("/login", (request, response) => {

    response.redirect('../public/html/login.html');

});

// GET /google/login
router.get('/google/login', passport.authenticate('google', {
    scope:
        ['profile', 'email']
}));   

// GET /google/callback
router.get('/google/callback',
    passport.authenticate('google'),
    function (request, response) {
        // print req.query.code
        console.log(request.query.code);
        // Successful authentication, redirect to “/”
        response.redirect('/auth/profile');
    }
);
    



// GET /verifyLogin
router.get("/verifyLogin", (request, response) => {

    if(request.user === undefined)
        response.status(401).send('User invalid: Not authorized.');
    else   
        response.status(200).send('Logged in');   

});

// GET /logout
router.get("/logout", (request, response) => {

    request.logout();
    request.session = null;
    response.redirect('/');

});


router.get("/profile", (request, response) => {

    response.redirect('../public/html/profile.html');

    console.log(request.user);

});

router.get("/authenticatedUser", (request, response) => {

    if(request.user)
    {
        const user = { user: request.user }
        response.send(user);
    }
    else
    {
        response.status(401).send('User not authenticated.');
    }

});



module.exports = router;
