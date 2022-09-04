import { Component, OnInit } from '@angular/core';
import {  FormBuilder,FormGroup, Validators } from '@angular/forms';
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

  form_editar : FormGroup;
  isSubmitted: boolean = false;
  data:string;
  edicao:boolean = true;
  constructor(private router: Router, private alertController: AlertController, 
    private contatoService: ContatoService,  private formBuilder:FormBuilder) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.contato = nav.extras.state.objeto;
    this.data= new Date().toISOString();
    this.form_editar = this.formBuilder.group({
      nome: [this.contato.nome, [Validators.required]], 
      telefone: [this.contato.telefone, [Validators.required, Validators.minLength(10)]],
      genero: [this.contato.genero, [Validators.required]],
      dataNascimento: [this.contato.dataNascimento, [Validators.required]]
    });
    
  }
 alterarEdicao(){
   if(this.edicao == true){
     this.edicao = false;
   }else{
     this.edicao = true;
   }
 }
  editar(){
    console.log(this.form_editar.value);
    this.contatoService.editar(this.contato, this.form_editar.value.nome, this.form_editar.value.telefone, this.form_editar.value.genero, this.form_editar.value.dataNascimento)
    this.presentAlert("Agenda", "Sucesso", "Contato cadastrado!");
    this.router.navigate(["/home"]);
    
  }
  excluir(){
    this.presentAlertConfirm("Agnda", "Excluir Contato", "Voce deseja realmente excluir contato?")
  }
  private excluirContato(){
    if(this.contatoService.excluir(this.contato)){
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

  
  async presentAlert(header: string, subHeader: string, message:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  get errorControl(){
    return this.form_editar.controls;
  }

  submitForm() : boolean{
    this.isSubmitted = true;
    if(!this.form_editar.valid){
      this.presentAlert("Agenda", "Erro", "Todos os campos devem ser preenchidos.");
      return false;
    }else{
      this.editar();
    }
  }


  
  
}
