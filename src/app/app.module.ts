import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { LocalNumberPipe } from './pipes/local-number.pipe';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  imports: [BrowserModule, FormsModule, FullCalendarModule],
  declarations: [
    AppComponent,
    LocalDatePipe,
    LocalNumberPipe
  ],
  providers: [LocalDatePipe, LocalNumberPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
