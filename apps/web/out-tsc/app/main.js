import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './services/auth.service';
bootstrapApplication(AppComponent, { providers: [provideHttpClient(withInterceptors([authInterceptor]))] })
    .catch((error) => console.error('Unable to start the application', error));
//# sourceMappingURL=main.js.map