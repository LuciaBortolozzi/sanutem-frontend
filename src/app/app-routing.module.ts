import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './home/home.component';
import {UserProfileComponent} from './auth/user-profile/user-profile.component';
import {AuthGuard} from './auth/auth.guard';
import {RegisterPetComponent} from './auth/register-pet/register-pet.component';
import {SettingsComponent} from './auth/settings/settings.component';
import {ModifyProfileComponent} from './auth/modify-profile/modify-profile.component';
import {ManagePetsComponent} from './auth/manage-pets/manage-pets.component';
import {SearchComponent} from './auth/search/search.component';
import {SchedulerComponent} from './auth/scheduler/scheduler.component';
import {LinkReceptionistComponent} from './auth/link-receptionist/link-receptionist.component';
import {AvailabilityComponent} from './auth/availability/availability.component';
import {MedicalTestsComponent} from './auth/medical-tests/medical-tests.component';
import {MedicalHistoryComponent} from './auth/medical-history/medical-history.component';
import {CalendarComponent} from './auth/calendar/calendar.component';
import {ViewCalendarComponent} from './auth/view-calendar/view-calendar.component';
import {ModifyCalendarComponent} from './auth/modify-calendar/modify-calendar.component';
import {ModifyPetComponent} from './auth/modify-pet/modify-pet.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'user-profile/:name', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/update', component: ModifyProfileComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/register-pet', component: RegisterPetComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/manage-pets', component: ManagePetsComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/manage-pets/modify-pets/:id', component: ModifyPetComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/medical-tests', component: MedicalTestsComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/medical-history', component: MedicalHistoryComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/search/:professional/schedule', component: SchedulerComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/link-receptionist', component: LinkReceptionistComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/availability', component: AvailabilityComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/view-calendar', component: ViewCalendarComponent, canActivate: [AuthGuard]},
  {path: 'user-profile/:name/modify-calendar', component: ModifyCalendarComponent, canActivate: [AuthGuard]},
  {path: 'sign-up', component: SignupComponent},
  {path: 'settings/:name', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
