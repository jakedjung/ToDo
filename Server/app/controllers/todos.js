var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    ToDo = require('../../../Client/src/resources/data/todos');
    module.exports = function (app, config) {
    app.use('/api', router);


//CHANGE ALL REFRENCES TO USER TO TODO!!!   

//This also needs some more serious changing DO THAT!!!   
    router.route('/todos/user/:userId').get(function(req, res, next){
		logger.log('Get all todos', 'verbose');
            var query = todo.find({user: req.params.userId})
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
      

    router.post('/todos', function (req, res, next) {
         logger.log('Create ToDo', 'verbose');
        var todo = new ToDo(req.body);
        todo.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch( err => {
            return next(err);
        });
      
    });

    router.route('/todos').post(function(req, res, next){
		logger.log('Create ToDo', 'verbose');
        res.status(201).json({messge: "Create todo"});
    });

    router.route('/todos').put(function(req, res, next){
		logger.log('Update ToDo', 'verbose');
        ToDo.findOneAndUpdate({_id: req.params.userId},	req.body, {new:true, multi:false})
                .then(todo => {
                    res.status(200).json(todo);
                })
                .catch(error => {
                    return next(error);
                });
        
    });

    router.route('/todos/password/userId').put(function(req, res, next){
		logger.log('Update todo password' + req.params.userId, 'verbose');
        res.status(200).json({messge: 'Update todo password' + req.params.userId});
    });

    router.route('/todos/:userId').get(function(req, res, next){
		logger.log('Delete ToDo ' + req.param.userId, 'verbose');
        ToDo.remove({ _id: req.params.userId })
                .then(todo => {
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
