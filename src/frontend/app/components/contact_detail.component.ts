import { Component, OnInit } from 'angular2/core';
import { RouteParams, Router } from 'angular2/router';
import {NgForm}    from 'angular2/common';
import {Contact} from './contact.model';
import {ContactService} from './contact.service';

@Component({
  selector: 'contact-detail',
  templateUrl: './app/components/contact_detail.component.html',
  styles: [`.ng-valid[required] {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid {
  border-left: 5px solid #a94442; /* red */
}`]
})
export class ContactDetailComponent implements OnInit {

  contact: Contact;
  active = true;

  constructor(
    private _router: Router,
    private _contactService: ContactService,
    private _routeParams: RouteParams) {
  }

ngOnInit() {
    let id = + this._routeParams.get('id');
    this._contactService.getContact(id)
      .then(contact => this.contact = contact);
  }

  goBack() {
    window.history.back();
  }
  onSubmit() {
    this._contactService.saveContact(this.contact);
    let link = ['Dashboard'];
    this._router.navigate(link);
  }
    showFormControls(form:NgForm){

    return form && form.controls['name'] &&
    form.controls['name'].value; // Dr. IQ
  }
}