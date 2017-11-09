import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class List {
	constructor(router){
        this.router = router;
		this.message = "List";
    }
    //logout function 
    //triggers by click of logout button in list.html
    logout(){
        this.router.navigate('home');
    }
}
