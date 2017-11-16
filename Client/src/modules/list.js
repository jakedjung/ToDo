import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {ToDos} from '../resources/data/todos';

//may have to update look ate home.js slide from aurelia authentication presentation
@inject(ToDos, Router)
export class List {
	constructor(todos, router){
        this.todos = todos;        
        this.router = router;
        this.message = "List";
        this.user = JSON.parse(sessionStorage.getItem('user'));
        this.showList = true;
        priorities =['Low', 'Medium', 'High', 'Critical'];
    }
    
    async activate(){
		await this.todos.getUserTodos(this.user._id);
	}

    createTodo(){	
		this.todoObj = {
			todo: "",
			description: "",
			dateDue: new Date(),
			 userId: this.user._id,
			priority: this.priorities[0]
		}
		this.showList = false;		
    }
    async saveTodo(){
		if(this.todoObj){		
			let response = await this.todos.save(this.todoObj);
			if(response.error){
				alert("There was an error creating the ToDo");
			} else {
				//Could provide feeback									
			}
			this.showList = true;
		}
	}


    //logout function 
    //triggers by click of logout button in list.html
    logout(){
        sessionStorage.removeItem('user');
        this.auth.logout();
    }
    
}
