import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { EventosComponent } from './components/eventos/eventos.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { TituloComponent } from './shared/titulo/titulo.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

import { EventoService } from './services/evento.service';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { NavComponent } from './shared/nav/nav.component';



@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    DashboardComponent,
    ContatosComponent,
    PerfilComponent,
    NavComponent,
    TituloComponent,
    DateTimeFormatPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule
  ],
  providers: [EventoService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
