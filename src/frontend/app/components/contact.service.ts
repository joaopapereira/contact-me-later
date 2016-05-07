/// <reference path="../../../../typings/browser.d.ts" />
import {Injectable} from 'angular2/core';
import Datastore = require('nedb');
//import {NeDBDataStore} from 'nedb';
import {Contact} from './contact.model';

let contacts = new Array<Contact>();
contacts[0] = new Contact();
contacts[0]._id = 0;
contacts[0].job_description = "Description 1";
contacts[1] = new Contact();
contacts[1]._id = 1;
contacts[1].job_description = "Description 2";
@Injectable()
export class ContactService {
    db = new Datastore({ filename: './app.db', autoload: true });
    contacts: Contact[];
    constructor() { }
    getContacts() {
        return new Promise<Contact[]>(function(resolve, reject){
            /*this.db.find({}, function (err, docs) {
                // docs is an array containing documents Mars, Earth, Jupiter
                // If no document is found, docs is equal to []
                resolve(docs);
            });*/
            resolve(contacts);
        });
    }
    getContact(id: number) {
        return new Promise<Contact>(function(resolve, reject){
            if(id === -1) {
                resolve(new Contact());
            } else {
                /*this.db.find({_id: id}, function (err, docs) {
                    // docs is an array containing documents Mars, Earth, Jupiter
                    // If no document is found, docs is equal to []
                    resolve(docs);
                });*/
                resolve(contacts[id]);
            }
        });
    }
    saveContact(contact: Contact) {
        return new Promise<Contact>(function(resolve, reject){
            if(typeof contact._id === 'undefined') {
                /*this.db.insert(contact, function (err, docs) {
                    // docs is an array containing documents Mars, Earth, Jupiter
                    // If no document is found, docs is equal to []
                    resolve(docs);
                });*/
                contact._id = contacts.length;
                contacts.push(contact);
                resolve(contact);
            } else {
                /*this.db.update({_id: contact._id},contact, function (err, docs) {
                    // docs is an array containing documents Mars, Earth, Jupiter
                    // If no document is found, docs is equal to []
                    resolve(docs);
                });*/
                contacts[contact._id] = contact;
                resolve(contact);
            }
        });
    }
}