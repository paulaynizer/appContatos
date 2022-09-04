import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CadastrarPageRoutingModule } from './cadastrar-routing.module';
import { CadastrarPage } from './cadastrar.page';
import { BrMaskerModule } from 'br-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    IonicModule,
    CadastrarPageRoutingModule
  ],
  declarations: [CadastrarPage]
})
export class CadastrarPageModule {}
