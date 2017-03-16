// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// app component imports
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// app services imports
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { ProfileComponent } from './profile/profile.component';
import { RegisterOrganizationComponent } from './register-organization/register-organization.component';

//NotFoundCompononent needs to be the last in list
const appRoutes: Routes = [
  //{ path: 'login', component: LoginComponent},
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register-org', component: RegisterOrganizationComponent },
  { path: '**', component: NotFoundComponent },

];


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MainMenuComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    RegisterOrganizationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
