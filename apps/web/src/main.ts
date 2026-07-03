import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeIt from '@angular/common/locales/it';
import localePt from '@angular/common/locales/pt';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './services/auth.service';

registerLocaleData(localeFr);
registerLocaleData(localeEs);
registerLocaleData(localePt);
registerLocaleData(localeDe);
registerLocaleData(localeIt);

bootstrapApplication(AppComponent, { providers: [provideHttpClient(withInterceptors([authInterceptor]))] }).catch(
  (error: unknown) => console.error('Unable to start the application', error),
);
