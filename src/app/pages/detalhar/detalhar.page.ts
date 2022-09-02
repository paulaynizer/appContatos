import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Contato } from 'src/app/models/contato';
import { ContatoService } from 'src/app/services/contato.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  contato: Contato;
  telefone : number;
  genero: string;
  nome : string;
  dataNascimento:string;
  data:string;
  edicao:boolean = true;
  constructor(private router: Router, private alertController: AlertController, private conatoService: ContatoService) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.contato = nav.extras.state.objeto;
    this.data= new Date().toISOString();
    this.nome = this.contato.nome;
    //nome: ["this.contato.nome", [Validators.required]]
    this.telefone= this.contato.telefone;
    this.genero = this.contato.genero;
    this.dataNascimento=this.contato.dataNascimento;
  }
 alterarEdicao(){
   if(this.edicao == true){
     this.edicao = false;
   }else{
     this.edicao = true;
   }
 }
  editar(){
    this.dataNascimento= this.dataNascimento.split('T')[0];
    if((this.validar(this.nome)) && this.validar(this.telefone) && this.validar(this.genero) && this.validar(this.dataNascimento)){
      if(this.conatoService.editar(this.contato, this.nome, this.telefone, this.genero, this.dataNascimento)){
        this.presentAlert("Agenda", "Sucesso", "Contato cadastrado!");
        this.router.navigate(["/home"]);
      }else{
        this.presentAlert("Agenda", "Erro", "Contato não encontrado");
      }
    }else{
      this.presentAlert("Agenda", "Erro", "Todos os campos devem ser preenchidos.");
    }
  }
  excluir(){
    this.presentAlertConfirm("Agnda", "Excluir Contato", "Voce deseja realmente excluir contato?")
  }
  private excluirContato(){
    if(this.conatoService.excluir(this.contato)){
      this.presentAlert("Agenda", "Excluir", "Exclusão realizada");
      this.router.navigate(["/home"]);
    }else{
      this.presentAlert("Agenda", "Erro", "Contato não encontrado");
    }
  }
  async presentAlertConfirm(header: string, subHeader : string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message :message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
      
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.excluirContato();
          },
        },
      ],
    });

    await alert.present();
  }

  private validar(campo: any) : boolean{
    if(!campo){
      return false;
    }
    return true;
  }
  async presentAlert(header: string, subHeader: string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  
}
