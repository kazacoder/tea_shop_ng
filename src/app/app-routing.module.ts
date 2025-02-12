import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/pages/main/main.component";
import {ProductsComponent} from "./components/pages/products/products.component";
import {OrderComponent} from "./components/pages/order/order.component";
import {ProductComponent} from "./components/pages/product/product.component";
const commonTitle = 'Tea Shop | '

const routes: Routes = [
  {path: '', component: MainComponent, title: commonTitle + 'Главная'},
  {path: 'products', component: ProductsComponent, title: commonTitle + 'Каталог'},
  {path: 'products/:id', component: ProductComponent, title: commonTitle + 'О товаре'},
  {path: 'order', component: OrderComponent, title: commonTitle + 'Заказ'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
