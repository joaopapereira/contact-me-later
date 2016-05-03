//app.ts
import {Component} from 'angular2/core';  
import {ContactService} from './contact.service';
import {Contact} from './contact.model';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {DashboardComponent} from './dashboard.component';
import {ContactDetailComponent} from './contact_detail.component';


@Component({
  selector: 'ng2-electron-app',
  templateUrl: './app/components/app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ContactService]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/contact/:id',
    name: 'ContactDetail',
    component: ContactDetailComponent
  }
])
export class AppComponent{  
    title = "Contacts";
    contacts: Contact[];
    
    constructor(private _contactService: ContactService) { }
    
    getContacts() {
        this._contactService.getContacts().then(contacts => this.contacts = contacts);
    }
    
    ngOnInit() {
        this.getContacts();
    }
}