const errorCode = {
    unknown: -1,
    success: 0,
    logout_session_destory_failed: 1000,
    logout_session_not_exist_failed: 1001,
    join_findOne_failed: 1002,
    join_findOne_not_exist_user_failed: 1003,
    join_newUser_save_failed: 1004,
}

const login = (req, res) => {
    const email = req.body.email;
    const secret = req.body.secret;

    req.session.user = {
        email: email,
        secret: secret
    }

    res.json({resultCode: 0, data: {email: email, secret: secret}});
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
        res.json({resultCode: errorCode.logout_session_not_exist_failed, data: "not logined"});
    }
}

const join = (req, res, User) => {    
    const email = req.body.email;
    const secret = req.body.secret;

    User.findOne({email: email}, (error, user) => {
        if(error) {
            res.json({resultCode: errorCode.join_findOne_failed, data: {error: error}});
            return;
        } else if(user) {
            res.json({resultCode: errorCode.join_findOne_not_exist_user_failed, data: {message: user.email + " is exists"}});
            return;
        }

        var newUser = new User({email: email, secret: secret});

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

