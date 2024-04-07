import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AngularFireModule } from '@angular/fire/compat';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import {AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ErrorComponent } from './componentes/error/error.component';

const firebaseConfig = {
  apiKey: "AIzaSyBgFfrHP_rBJS2JI4WSUHjfJ7Dx3LQt4wA",
  authDomain: "sala-juegos-labo-iv.firebaseapp.com",
  projectId: "sala-juegos-labo-iv",
  storageBucket: "sala-juegos-labo-iv.appspot.com",
  messagingSenderId: "544400692713",
  appId: "1:544400692713:web:092ad4274ae167acc86778"
};

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
