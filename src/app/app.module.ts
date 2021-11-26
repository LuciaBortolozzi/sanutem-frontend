import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SignupComponent} from './auth/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoginComponent} from './auth/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {TokenInterceptor} from './token-interceptor';
import {HomeComponent} from './home/home.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {EditorModule} from '@tinymce/tinymce-angular';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {UserProfileComponent} from './auth/user-profile/user-profile.component';
import {FooterComponent} from './footer/footer.component';
import {RegisterPetComponent} from './auth/register-pet/register-pet.component';
import {SettingsComponent} from './auth/settings/settings.component';
import {ModifyProfileComponent} from './auth/modify-profile/modify-profile.component';
import {ManagePetsComponent} from './auth/manage-pets/manage-pets.component';
import {SearchComponent} from './auth/search/search.component';
import {SchedulerComponent} from './auth/scheduler/scheduler.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {LinkReceptionistComponent} from './auth/link-receptionist/link-receptionist.component';
import {AvailabilityComponent} from './auth/availability/availability.component';
import {MedicalHistoryComponent} from './auth/medical-history/medical-history.component';
import {MedicalTestsComponent} from './auth/medical-tests/medical-tests.component';
import {CalendarComponent} from './auth/calendar/calendar.component';
import {ViewCalendarComponent} from './auth/view-calendar/view-calendar.component';
import {ModifyCalendarComponent} from './auth/modify-calendar/modify-calendar.component';
import {ModifyPetComponent} from './auth/modify-pet/modify-pet.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    UserProfileComponent,
    FooterComponent,
    RegisterPetComponent,
    SettingsComponent,
    ModifyProfileComponent,
    ManagePetsComponent,
    SearchComponent,
    SchedulerComponent,
    LinkReceptionistComponent,
    AvailabilityComponent,
    MedicalHistoryComponent,
    MedicalTestsComponent,
    CalendarComponent,
    ViewCalendarComponent,
    ModifyCalendarComponent,
    ModifyPetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule,
    FormsModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory})
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
