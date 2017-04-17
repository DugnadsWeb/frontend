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
import { MakeDugnadComponent } from './components/make-dugnad/make-dugnad.component';
import { InfoHubComponent } from './components/info-hub/info-hub.component';
import { IndexComponent } from './pages/index/index.component';
import { DugnadComponent } from './pages/dugnad/dugnad.component';


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
import { OrgAdminPanelComponent } from './components/org-admin-panel/org-admin-panel.component';
import { ApproveOrgApplicationComponent } from './components/approve-org-application/approve-org-application.component';
import { ApplicantRowComponent } from './components/applicant-row/applicant-row.component';
import { EditOrgComponent } from './components/edit-org/edit-org.component';
import { OrgAdminAssignerComponent } from './components/org-admin-assigner/org-admin-assigner.component';
import { FooterComponent } from './components/footer/footer.component';
import { DugnadListComponent } from './components/dugnad-list/dugnad-list.component';
import { DugnadViewComponent } from './components/dugnad-view/dugnad-view.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { DugnadInfoComponent } from './components/dugnad-info/dugnad-info.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { DialogContainerComponent } from './components/dialog-container/dialog-container.component';
import { CreateActivityComponent } from './components/create-activity/create-activity.component';
import { TableOfContentComponent } from './components/table-of-content/table-of-content.component';


// app services imports
import { AuthService, UserService, OrgService, MessageService, AuthGuardService, DugnadService, ActivityService } from './services/services';

// app models/pipes etc
import { SortpipePipe } from './models/sortpipe.pipe';

// directives
import { DialogWindowDirective } from './directives/dialog-window.directive';
import { ActivityViewComponent } from './components/activity-view/activity-view.component';
import { KontaktComponent } from './components/kontakt/kontakt.component';



//NotFoundCompononent needs to be the last in list
const appRoutes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGuardService]},
  { path: 'register-org', component: RegisterOrganizationComponent },
  { path: 'org/:id', component: OrganizationComponent },
  { path: 'search', component: SearchComponent},
  { path: 'make-dugnad', component: MakeDugnadComponent },
  { path: 'info-hub', component: InfoHubComponent },
  { path: 'dugnad/:id', component: DugnadComponent },
  { path: 'toc', component: TableOfContentComponent},
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
    OrgAdminPanelComponent,
    ApproveOrgApplicationComponent,
    ApplicantRowComponent,
    EditOrgComponent,
    MakeDugnadComponent,
    OrgAdminAssignerComponent,
    FooterComponent,
    InfoHubComponent,
    IndexComponent,
    DugnadListComponent,
    DugnadViewComponent,
    EditUserComponent,
    DugnadComponent,
    DugnadInfoComponent,
    ActivityListComponent,
    DialogWindowDirective,
    DialogContainerComponent,
    CreateActivityComponent,
    ActivityViewComponent,
    TableOfContentComponent,
    KontaktComponent,
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
  providers: [AuthService,
    UserService,
    OrgService,
    MessageService,
    AuthGuardService,
    DugnadService,
    ActivityService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ CreateActivityComponent, MakeDugnadComponent ]
})

export class AppModule { }
