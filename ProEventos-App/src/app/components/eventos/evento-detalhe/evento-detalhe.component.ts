import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento = {} as Evento;
  form: FormGroup;
  estadoSalvar = 'post';

  constructor(private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) {
      this.localeService.use('pt-br');
    }

  get f(): any{
    return this.form.controls;
  }

  get bsConfig():any{
    return { adaptivePosition: true, dateInputFormat:'DD/MM/YYYY hh:mm a',
  containerClass:'theme-default', showWeekNumbers:false };
  }

  public carregarEvento(): void{
    const eventoId = this.router.snapshot.paramMap.get('id');
    if(eventoId != null){
      this.spinner.show();
      this.estadoSalvar = 'put';
      //+ na frente converte para int
      this.eventoService.getEventosById(+eventoId).subscribe({
        next: (evento: Evento) => {
          //this.evento = Object.assign({}, evento);
          //Com os 3 pontinhos atribui os valores do evento
          this.evento = {...evento};
          this.form.patchValue(this.evento);
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error("Erro ao tentar carregar evento.", "Erro!")
          console.log(error)
        },
        complete: ()=> {this.spinner.hide()}
      })
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  private validation(): void {
    this.form = this.formBuilder.group({
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      imagemURL: ['', Validators.required],
      telefone:['', Validators.required],
      email:['', [Validators.required, Validators.email]]
    });
  }

  public resetForm(): void{
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors &&  campoForm.touched};
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {

      this.evento = (this.estadoSalvar === 'post')
                ? {...this.form.value}
                : {id: this.evento.id, ...this.form.value};

      //this.eventoService.put ou .post é o estado
      //mas no lugar do post, usar [] que também funciona
      this.eventoService[this.estadoSalvar](this.evento).subscribe(
        () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso'),
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error('Error ao salvar evento', 'Erro');
        },
        () => this.spinner.hide()
      );
    }
  }
}
