var path = require('path'),    
rootPath = path.normalize(__dirname + '/..'),    
env = process.env.NODE_ENV || 'development';
//set variables and requires needed for config
var config = {  
development: {    
            root: rootPath,     
            app: {      name: 'exam'    },  //set app name  
            port: 5000,  //set server port for dev mode
            db: 'mongodb://127.0.0.1/todo-dev'
 },  

 production: {    
              root: rootPath,    
              app: {      name: 'exam'    },  //set app name
               port: 80,  }, //set server port to :80 for production mode
               db:'mongodb://127.0.0.1/todo'
  };

module.exports = config[env];
//export config for use outside of file