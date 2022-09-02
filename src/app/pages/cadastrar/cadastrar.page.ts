import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Contato } from '../../models/contato';
import { ContatoService } from '../../services/contato.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  form_cadastrar : FormGroup;
  isSubmitted: boolean = false;
  data: string;
  constructor(private alertController: AlertController, private router: Router,
     private conatoService: ContatoService, private formBuilder:FormBuilder) {}

  ngOnInit() {
    this.data= new Date().toISOString();
    this.form_cadastrar = this.formBuilder.group({
      nome: ["", [Validators.required]], 
      telefone: ["", [Validators.required, Validators.minLength(10)]],
      genero: ["", [Validators.required]],
      dataNascimento: ["", [Validators.required]]
    });
  }

  get errorControl(){
    return this.form_cadastrar.controls;
  }

  submitForm() : boolean{
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      this.presentAlert("Agenda", "Erro", "Todos os campos devem ser preenchidos.");
      return false;
    }else{
      this.cadastrar();
    }
  }

  private cadastrar(){
    
    this.conatoService.inserir(this.form_cadastrar.value);
    this.presentAlert("Agenda", "Sucesso", "Contato cadastrado!");
    this.router.navigate(["/home"]);
    
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
