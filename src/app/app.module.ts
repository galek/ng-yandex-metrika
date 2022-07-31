import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MetrikaModule } from 'projects/ng-yandex-metrika/src/lib/ng-yandex-metrika.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MetrikaModule.forRoot({
      id: 45631461,
      webvisor: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
