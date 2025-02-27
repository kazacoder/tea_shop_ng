import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {OrderComponent} from "./order.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrderComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderRoutingModule,
  ]
})
export class OrderModule { }
