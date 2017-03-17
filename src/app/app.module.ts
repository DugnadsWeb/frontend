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
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterOrganizationComponent } from './pages/register-organization/register-organization.component';
import { OrganizationComponent } from './pages/organization/organization.component';

// app services imports
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { OrgService  } from './services/org.service';


//NotFoundCompononent needs to be the last in list
const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register-org', component: RegisterOrganizationComponent },
  { path: 'org', component: OrganizationComponent },
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
    OrganizationComponent,
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
  providers: [AuthService, UserService, OrgService],
  bootstrap: [AppComponent]
})
export class AppModule { }
