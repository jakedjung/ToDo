var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    ToDo = mongoose.model('Todo'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    passport = require('passport');


    module.exports = function (app, config) {
    app.use('/api', router);
  
 

//This also needs some more serious changing DO THAT!!!   
    router.route('/todos/user/:userId').get(function(req, res, next){
		logger.log('Get all todos', 'verbose');
            var query = ToDo.find({user: req.params.userId})
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

 
  
    router.route('/todos/:todoId').put(function(req, res, next){
		logger.log('Update ToDo', 'verbose');
        ToDo.findOneAndUpdate({_id: req.params.todoId},	req.body, {new:true, multi:false})
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

    router.route('/todos/:userId').delete(function(req, res, next){
		logger.log('Delete ToDo' + req.param.userId, 'verbose');
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

  var storage = multer.diskStorage({
	destination: function (req, file, cb) {      
	  	var path = config.uploads + req.params.userId + "/";
		mkdirp(path, function(err) {
			if(err){
				res.status(500).json(err);
			} else {
				cb(null, path);
			}
		});
	},
	filename: function (req, file, cb) {
		let fileName = file.originalname.split('.');   
		cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
	}
  });

  var upload = multer({ storage: storage });
  
  router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
        logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
        
        ToDo.findById(req.params.todoId, function(err, todo){
            if(err){ 
                return next(err);
            } else {     
                if(req.files){
                    todo.file = {
                        filename : req.files[0].filename,
                        originalName : req.files[0].originalname,
                        dateUploaded : new Date()
                    };
                }           
                todo.save()
                    .then(todo => {
                        res.status(200).json(todo);
                    })
                    .catch(error => {
                        return next(error);
                    });
            }
        });
    });
    
};
