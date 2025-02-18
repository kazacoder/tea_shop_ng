import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrderComponent} from "./order.component";
import {commonTitle} from "../../shared/config/consts";

const routes: Routes = [
  {path: 'order', component: OrderComponent, title: commonTitle + 'Заказ'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
