import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public evento: any ={
    Tema:'Angular',
    Local:'São Paulo'
  }

  public listaEventos: any = [
    {
      Tema:'Angular 2',
      Local:'Rio de Janeiro'
    },
    {
      Tema:'Asp.net Core',
      Local:'Maceio'
    }
  ]

  public buscaEvento: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  public getEventos(): void{
    this.http.get('https://localhost:44383/api/Eventos').subscribe(
      respose => this.buscaEvento = respose,
      error => console.log(error)
    );
  }
}

