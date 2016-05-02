import { Component, OnInit } from 'angular2/core';
import { Router } from 'angular2/router';
import {Contact} from './contact.model';
import {ContactService} from './contact.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './app/components/dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(
    private _router: Router,
    private _contactService: ContactService) {
  }

  ngOnInit() {
      console.log("Bamm");
    this._contactService.getContacts()
      .then(contacts => this.contacts = contacts);
  }

  gotoDetail(contact: Contact) {
    let link = ['ContactDetail', { id: contact._id }];
    this._router.navigate(link);
  }
  
  createContact() {
      var contact = new Contact();
      contact._id = -1;
      this.gotoDetail(contact);
  }
  editContact(contact: Contact) {
      this.gotoDetail(contact);
  }
}