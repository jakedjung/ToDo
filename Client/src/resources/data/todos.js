import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class ToDos {
 
    constructor(data) {
        		this.data = data;
        		this.TODO_SERVICE = 'todos'; //mayneed to edit this to match file names
                this.todosArray = []
   		 }

        async getUserTodos(id){
            let response = await this.data.get(this.TODO_SERVICE + "/user/" + id);
            if(!response.error && !response.message){
                this.todosArray = response;
            }
        }

        async save(todo){
                if(todo){
                    let serverResponse = await this.data.post(todo, this.TODO_SERVICE);
                    if(! serverResponse.error){
                    this.todosArray.push(serverResponse);
                     }
                    return serverResponse;
                }
            }
            
            async uploadFile(files, userId, todoId){
                        let formData = new FormData();
                        files.forEach((item, index) => {
                        formData.append("file" + index, item);
                        });    
                    let response = await this.data.uploadFiles(formData, this.TODO_SERVICE + "/upload/" + userId + "/" + todoId);
                    return response;
                }
                
            async deleteTodo(id){
                let response = await this.data.delete(this.TODOS_SERVICE + "/" + id);
                if(!response.error){
                    for(let i = 0; i < this.todosArray.length; i++){
                        if(this.todosArray[i]._id === id){
                            this.todosArray.splice(i,1);
                        }
                    }
                }
            }
        
        }
