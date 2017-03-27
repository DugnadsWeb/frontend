// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// app routerpage component imports
import { AppComponent } from './app.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterOrganizationComponent } from './pages/register-organization/register-organization.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { SearchComponent } from './pages/search/search.component';

// app component imports
import { DugnadOverViewComponent } from './components/dugnad-over-view/dugnad-over-view.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { UserBoxComponent } from './components/user-box/user-box.component';
import { MembershipBtnComponent } from './components/membership-btn/membership-btn.component';
import { OrgInfoComponent } from './components/org-info/org-info.component';
import { OrgMessageBoardComponent } from './components/org-message-board/org-message-board.component';
import { MessageSenderComponent } from './components/message-sender/message-sender.component';
import { MessageComponent } from './components/message/message.component';

// app services imports
import { AuthService, UserService, OrgService, MessageService } from './services/services';

// app models/pipes etc
import { SortpipePipe } from './models/sortpipe.pipe';



//NotFoundCompononent needs to be the last in list
const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register-org', component: RegisterOrganizationComponent },
  { path: 'org/:id', component: OrganizationComponent },
  { path: 'search', component: SearchComponent},
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
    DugnadOverViewComponent,
    SearchComponent,
    OrgInfoComponent,
    MembersListComponent,
    UserBoxComponent,
    MembershipBtnComponent,
    OrgMessageBoardComponent,
    MessageSenderComponent,
    SortpipePipe,
    MessageComponent,
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
  providers: [AuthService, UserService, OrgService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
