import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NestQLAngularModule } from '@nestql/angular';
import { AppComponent } from './app.component';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';
import { ApiFacadeService } from './api.facade';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NestQLAngularModule.forRoot({
      apiUrl: 'http://localhost:3333',
      operations: [ApiFacadeService],
    }),
    environment.production ? [] : AkitaNgDevtools.forRoot(),
  ],
  providers: [
    { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
