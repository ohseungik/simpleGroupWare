const errorCode = {
    unknown: -1,
    success: 0,
    login_findOne_failed: 1000,
    login_secret_failed: 1001,
    login_not_found_email_failed: 1002,
    logout_session_destory_failed: 1003,
    logout_session_not_exist_failed: 1004,
    join_findOne_not_exist_user_failed: 1005,
    join_newUser_save_failed: 1006,
}

const login = (req, res, User) => {
    const email = req.body.email;
    const secret = req.body.secret;

    req.session.user = {
        email: email,
        secret: secret
    }

    User.findOne({email: email}, (error, user) => {
        if(error) {
            res.json({resultCode: errorCode.login_findOne_failed, data: {error: error}});
            return;
        } else if(user) {
            if(user.secret === secret) {
               res.json({resultCode: 0, data: {email: email, secret: secret}});
            } else {
               res.json({resultCode: errorCode.login_secret_failed, data: {message: "secret is not matched"}});
            }

            return;
        } else {
            res.json({resultCode: errorCode.login_not_found_email_failed, data: {meessage: "check your email"}});
        }
    });
}

const logout = (req, res) => {
    if(req.session.user) {
        req.session.destroy((error) => {
            if(error) {
                res.json({resultCode: errorCode.logout_session_destory_failed, data: {error: error}});
                return;
            }

            res.json({resultCode: 0, data: {}});
        })
    } else {
        res.json({resultCode: errorCode.logout_session_not_exist_failed, data: {message: "not logined"}});
    }
}

const join = (req, res, User) => {    
    const email = req.body.email;
    const secret = req.body.secret;
    const name = req.body.name;
    const birthday = req.body.birthday;

    User.findOne({email: email}, (error, user) => {
        if(error) {
            res.json({resultCode: errorCode.join_findOne_failed, data: {error: error}});
            return;
        } else if(user) {
            res.json({resultCode: errorCode.join_findOne_not_exist_user_failed, data: {message: user.email + " is exists"}});
            return;
        }

        var newUser = new User({email: email, secret: secret, name: name, birthday: birthday});

        newUser.save(function (error, data) {
            if(error) {
                res.json({resultCode: errorCode.join_newUser_save_failed, data: {error: error}});
            } else {
                res.json({resultCode: 0, data: {email: data.email, secret: data.secret}});
            }
        })
    })
}

const ServiceAPI = {
    login: login,
    logout: logout,
    join: join
}

module.exports.ServiceAPI = ServiceAPI;

