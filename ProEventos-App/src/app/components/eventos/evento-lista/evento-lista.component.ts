import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {
  modalRef?: BsModalRef;
  public buscaEvento: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public eventoId:number;

  public widthImg=150;
  public marginImg=2;
  public mostrarImagem=true;
  private filtroListado: string = "";

  public get filtroLista():string {
    return this.filtroListado;
  }

  public set filtroLista(value: string){
    this.filtroListado=value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.buscaEvento;
  }

  public filtrarEventos(filtrarPor: string):Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.buscaEvento.filter(
      (event: { tema: string; }) => event.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private eventoService: EventoService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.carregarEventos();
  }

  public mostraImagem(imagemURL: string): string {
    return (imagemURL !== '')
      ? `${environment.apiURL}resources/images/${imagemURL}`
      : 'assets/images/semImagem.png';
  }

  public alterarImagem(): void {
    this.mostrarImagem = !this.mostrarImagem;
  }

  public carregarEventos(): void{
    const obeserver={
      next: (eventos: Evento[]) => {
        this.buscaEvento = eventos;
        this.eventosFiltrados = this.buscaEvento;
      },
      error: (error: any) => {this.spinner.hide(), this.toastr.error('Erro ao carregar os eventos','Erro!')},
      complete: () => this.spinner.hide()
    }
    this.eventoService.getEventos().subscribe(obeserver);
  }

  openModal(event: any,template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        console.log(result.mensagem)
        if (result.mensagem === 'Deletado') {
          this.toastr.success('O Evento foi deletado com Sucesso.', 'Deletado!');
          this.carregarEventos();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`, 'Erro');
      }
    ).add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void{
    console.log(id)
    this.router.navigate([`eventos/detalhe/${id}`])
  }

}
