const errorCode = {
    unknown: -1,
    parameters_failed: 1000,
    findOne_failed: 1001,
    login_secret_failed: 1002,
    login_not_found_email_failed: 1003,
    logout_session_destory_failed: 1004,
    logout_session_not_exist_failed: 1005,
    findOne_not_exist_user_failed: 1006,
    join_newUser_save_failed: 1007,
    find_failed: 1008,
    user_not_found_failed: 1009,
    update_failed: 1010
}

const login = (req, res, User) => {
    const email = req.body.email;
    const secret = req.body.secret;

    if(!email || !secret) {
        res.json({resultCode: errorCode.parameters_failed, data: {meessage: "parameters_failed"}});
        return;
    }

    User.findOne({email: email}, (error, user) => {
        if(error) {
            res.json({resultCode: errorCode.findOne_failed, data: {error: error}});
            return;
        } else if(user) {
            if(user.secret === secret) {
                req.session.user = {
                  email: email,
                  secret: secret,
                };

               res.json({resultCode: 0, data: {email: email, name: user.name, birthday: user.birthday}});
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

    if(!email || !secret || !name || !birthday) {
        res.json({resultCode: errorCode.parameters_failed, data: {meessage: "parameters_failed"}});
        return;
    }

    User.findOne({email: email}, (error, user) => {
        if(error) {
            res.json({resultCode: errorCode.findOne_failed, data: {error: error}});
            return;
        } else if(user) {
            res.json({resultCode: errorCode.findOne_not_exist_user_failed, data: {message: user.email + " is exists"}});
            return;
        }

        var newUser = new User({email: email, secret: secret, name: name, birthday: birthday, workStartDate: "", workEndDate: "", totalWorkDate: ""});

        newUser.save(function (error, data) {
            if(error) {
                res.json({resultCode: errorCode.join_newUser_save_failed, data: {error: error}});
            } else {
                res.json({resultCode: 0, data: {email: data.email, name: data.name, birthday: data.birthday}});
            }
        })
    })
}

const work = (req, res, User) => {
    let limit = req.query.limit;
    let pageNum = req.query.pageNum;
    
    if(!limit || !pageNum) {
        res.json({resultCode: errorCode.parameters_failed, data: {meessage: "parameters_failed"}});
        return;
    }

    User.find((error, user) => {
        if(error) {
            res.json({resultCode: errorCode.find_failed, data: {error: error}});
            return;
        } else if(user) {
            user = user.map((element) => {
                return {email: element.email, name: element.name, workStartDate: element.workStartDate, workEndDate: element.workEndDate, totalWorkDate: element.totalWorkDate}
            })

            let query = User.find();
            query.count((err, count) => {
                if(err) res.json({resultCode: errorCode.find_failed, data: {error: error}});
                else res.json({resultCode: 0, data: {user: user, pageNum: parseInt(pageNum), total: count}});
            });
            return;
        } else {
            res.json({resultCode: errorCode.user_not_found_failed, data: {meessage: "user not found"}});
        }
    }).skip(limit * pageNum);
}

const workStart = (req, res, User) => {
    const email = req.body.email;

    User.findOne({email: email}, (error, users) => {
        if(error) {
            res.json({resultCode: errorCode.findOne_failed, data: {error: error}});
            return;
        } else if(users) {
            let nowDate = new Date().toISOString();

            User.updateOne({email: users.email}, {workStartDate: nowDate}, (error, user) => {
                if(error) {
                    res.json({resultCode: errorCode.update_failed, data: {error: error}});
                    return;
                } else if(user) {
                    res.json({resultCode: 0, data: {email: users.email, name: users.name, birthday: users.birthday, workStartDate: users.workStartDate}});
                    return;
                }
            });
        }
    })
}

const workEnd = (req, res, User) => {
    const email = req.body.email;

    User.findOne({email: email}, (error, users) => {
        if(error) {
            res.json({resultCode: errorCode.findOne_failed, data: {error: error}});
            return;
        } else if(users) {
            let nowDate = new Date().toISOString();

            User.updateOne({email: users.email}, {workEndDate: nowDate}, (error, user) => {
                if(error) {
                    res.json({resultCode: errorCode.update_failed, data: {error: error}});
                    return;
                } else if(user) {
                    res.json({resultCode: 0, data: {email: users.email, name: users.name, birthday: users.birthday, workEndDate: users.workEndDate}});
                    return;
                }
            });
        }
    })
}

const workOne = (req, res, User) => {
    const email = req.query.email;

    User.findOne({email: email}, (error, users) => {
        if(error) {
            res.json({resultCode: errorCode.findOne_failed, data: {error: error}});
            return;
        } else if(users) {
            res.json({resultCode: 0, data: {email: users.email, workStartDate: users.workStartDate, workEndDate: users.workEndDate}});
            return;
        }
    })

}

const ServiceAPI = {
    login: login,
    logout: logout,
    join: join,
    work: work,
    workStart: workStart,
    workEnd: workEnd,
    workOne: workOne
}

module.exports.ServiceAPI = ServiceAPI;

