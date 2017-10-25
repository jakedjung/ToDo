var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
    module.exports = function (app, config) {
    app.use('/api', router);
    
    
    router.route('/users').get(function(req, res, next){
		logger.log('Get all ToDos', 'verbose');
            var query = User.find()
              .sort(req.query.order)
              .exec()
              .then(result => {
                   if(result && result.length) {
                  res.status(200).json(result);
              } else {
                  res.status(404).json({message: 'No ToDos'});
              }
              })
              .catch(err => {
                return next(err);
              });
          });
      

    router.post('/users', function (req, res, next) {
         logger.log('Create ToDo', 'verbose');
        var user = new User(req.body);
        user.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
            return next(err);
        });
      
    });

    router.route('/users').post(function(req, res, next){
		logger.log('Create ToDo', 'verbose');
        res.status(201).json({messge: "Create user"});
    });

    router.route('/users').put(function(req, res, next){
		logger.log('Update ToDo', 'verbose');
        User.findOneAndUpdate({_id: req.params.userId},	req.body, {new:true, multi:false})
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(error => {
                    return next(error);
                });
        
    });

    router.route('/users/password/userId').put(function(req, res, next){
		logger.log('Update user password' + req.params.userId, 'verbose');
        res.status(200).json({messge: 'Update user password' + req.params.userId});
    });

    router.route('/users/:userId').get(function(req, res, next){
		logger.log('Delete ToDo ' + req.param.userId, 'verbose');
        User.remove({ _id: req.params.userId })
                .then(user => {
                    res.status(200).json({msg: "ToDo Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
        
    });

    router.post('/login', function(req, res, next){
        console.log(req.body);
        var email = req.body.email
        var password = req.body.password;
  
        var obj = {'email' : email, 'password' : password};
      res.status(201).json(obj);
  });

};
