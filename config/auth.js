//This is an auth guard and can be added to any page we need authentification to view
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){ //isAuthenticated can be found from passport
            return next();
        }
        req.flash('error_msg', 'Please log in to view this resource');
        res.redirect('/users/login');
    }
}