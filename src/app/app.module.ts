import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

const appRoutes: Routes = [
  //{ path: 'login', component: LoginComponent},
  { path: '', component: AppComponent },
  { path: '**', component: NotFoundComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainMenuComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
