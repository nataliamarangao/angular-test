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

  public buscaEvento: any = [];
  public eventosFiltrados: any=[];
  widthImg: number=150;
  marginImg: number=2;
  mostrarImagem: boolean = true;
  private _filtroLista: string = "";

  public get filtroLista():string {
    return this._filtroLista;
  }

  public set filtroLista(value: string){
    this._filtroLista=value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.buscaEvento;
  }

  filtrarEventos(filtrarPor: string):any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.buscaEvento.filter(
      //ou (event: any)
      (event: { tema: string; }) => event.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos();
  }

  alterarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  public getEventos(): void{
    this.http.get('https://localhost:44383/api/Eventos').subscribe(
      respose => {
        this.buscaEvento = respose;
        this.eventosFiltrados = this.buscaEvento;
      },
      error => {console.log(error)}
    );
  }
}

