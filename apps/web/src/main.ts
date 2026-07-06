import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeIt from '@angular/common/locales/it';
import localePt from '@angular/common/locales/pt';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { AppComponent } from './app/app.component';
import { MemberPredictionsPageComponent } from './app/components/member-predictions-page/member-predictions-page.component';
import { TeamPageComponent } from './app/components/team-page/team-page.component';
import { authInterceptor } from './services/auth.service';

registerLocaleData(localeFr);
registerLocaleData(localeEs);
registerLocaleData(localePt);
registerLocaleData(localeDe);
registerLocaleData(localeIt);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(
      [
        { path: '', pathMatch: 'full', redirectTo: 'predictions' },
        { path: 'predictions', children: [] },
        { path: 'results', children: [] },
        { path: 'groups', children: [] },
        { path: 'profile', children: [] },
        { path: 'preferences', children: [] },
        { path: 'user/:id', component: MemberPredictionsPageComponent },
        { path: 'team/:id', component: TeamPageComponent },
        { path: '**', redirectTo: 'predictions' },
      ],
      withHashLocation(),
    ),
  ],
}).catch((error: unknown) => console.error('Unable to start the application', error));
