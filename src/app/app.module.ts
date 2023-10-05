import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { ErrorComponent } from './componentes/error/error.component';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RecuperarClaveComponent } from './componentes/recuperar-clave/recuperar-clave.component';
import { PreguntadosComponent } from './componentes/juegos/preguntados/preguntados.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AngularFireModule } from '@angular/fire/compat';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ValidarMailComponent } from './componentes/validar-mail/validar-mail.component';

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
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    ErrorComponent,
    RegistroComponent,
    RecuperarClaveComponent,
    PreguntadosComponent,
    NavbarComponent,
    ValidarMailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
