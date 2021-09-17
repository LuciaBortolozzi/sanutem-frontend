import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {CreatePostComponent} from './post/create-post/create-post.component';
import {CreateSubredditComponent} from './subreddit/create-subreddit/create-subreddit.component';
import {ListSubredditsComponent} from './subreddit/list-subreddits/list-subreddits.component';
import {ViewPostComponent} from './post/view-post/view-post.component';
import {UserProfileComponent} from './auth/user-profile/user-profile.component';
import {AuthGuard} from './auth/auth.guard';
import {RegisterPetComponent} from './auth/register-pet/register-pet.component';
import {SettingsComponent} from './auth/settings/settings.component';
import {ModifyProfileComponent} from './auth/modify-profile/modify-profile.component';
import {ManagePetsComponent} from './auth/manage-pets/manage-pets.component';
import {SearchComponent} from './search/search.component';
import {SchedulerComponent} from './scheduler/scheduler.component';
import {LinkReceptionistComponent} from './auth/link-receptionist/link-receptionist.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'view-post/:id', component: ViewPostComponent},
  {path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/update', component: ModifyProfileComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/register-pet', component: RegisterPetComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/manage-pets', component: ManagePetsComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/search', component: SearchComponent, canActivate: [AuthGuard]},
  // {path: 'user-profile/:name/search/:professional/schedule', component: SchedulerComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/search/schedule', component: SchedulerComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/link-receptionist', component: LinkReceptionistComponent, canActivate: [AuthGuard]},
  {path: 'list-subreddits', component: ListSubredditsComponent},
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'create-subreddit', component: CreateSubredditComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignupComponent},
  {path: 'settings/:name', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
