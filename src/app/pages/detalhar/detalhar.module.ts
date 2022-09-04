import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrMaskerModule } from 'br-mask';
import { IonicModule } from '@ionic/angular';
import { DetalharPageRoutingModule } from './detalhar-routing.module';
import { DetalharPage } from './detalhar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrMaskerModule,
    IonicModule,
    DetalharPageRoutingModule
  ],
  declarations: [DetalharPage]
})
export class DetalharPageModule {}
