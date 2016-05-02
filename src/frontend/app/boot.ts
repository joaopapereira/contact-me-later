//boot.ts
import {enableProdMode} from 'angular2/core';  
import {bootstrap} from 'angular2/platform/browser';  
import {provide} from 'angular2/core';
import {AppComponent} from './components/app';

import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';


enableProdMode();  
bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(LocationStrategy,
                          { useClass: HashLocationStrategy }),]);  