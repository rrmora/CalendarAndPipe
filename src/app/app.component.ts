import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import { SessionService } from './session.service';
import { OptionsInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  options: OptionsInput;
  calendarPlugins = [dayGridPlugin];
  today = new Date();
  val = 123.45;

  constructor(private session: SessionService) { }

  norway() {
    this.registerCulture('nb-NO');
  }

  sweden() {
    this.registerCulture('sv-SE');    
  }

  ngOnInit() {
    this.options = {
      editable: true,
      selectable: true,
      // locale: esLocale,
      customButtons: {
        myCustomButton: {
          text: 'Agregar cita',
          click: function () {
            const btnModal = document.getElementById('btnModal');
            btnModal.click();
          }
        }
      },
      header: {
        right: 'myCustomButton today prev,next'
      },
      dateClick: function(info) {
        alert('clicked ' + info.dateStr);
      },
      select: function(info) {
        alert('selected ' + info.startStr);
      },
      plugins: [ interactionPlugin, dayGridPlugin ]
    };
  }

  private registerCulture(culture: string) {
    if (!culture) {
      return;
    }
    this.session.locale = culture;
    const localeId = culture.substring(0, 2);

    this.localeInitializer(localeId).then((res) => {
      console.log(res);
      this.today = new Date();
      this.val++;
    });    
  }

  localeInitializer(localeId: string): Promise<any> {
    const promise =  new Promise((resolve, reject) => {
      /* webpackInclude: /(nb|sv)\.js$/ */
      import(`@angular/common/locales/${localeId}.js`)
        .then(module => {
          console.log(module);
          registerLocaleData(module.default);
          resolve();
        }, reject);
    });
    return promise;
    // return import(
    //   /* webpackInclude: /(nb|sv)\.js$/ */
    //   `@angular/common/locales/${localeId}.js`
    //   ).then(module => registerLocaleData(module.default));
  }

  dateClick(event) {
    console.log(event.detail);
  }
  eventClick(event) {
    console.log(event.detail);
  }
}
