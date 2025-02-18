import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../shared/types/product.type";
import {ProductService} from "../../../shared/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription, tap} from "rxjs";
import {OrderService} from "../../../shared/services/order.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  private subscriptionProduct: Subscription | null = null;
  private subscriptionRoute: Subscription | null = null;
  public product: ProductType = {
    id: 0,
    image: '',
    title: '',
    price: 0,
    description: '',
  };

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public orderService: OrderService) {
  }

  ngOnInit(): void {
    this.subscriptionRoute = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.subscriptionProduct = this.productService.getProduct(params['id'])
          .pipe(
            tap(data => {
              if (!data) {
                throw new Error('Product not found');
              }
            }),
          )
          .subscribe(
            {
              next: data => {
                this.product = data;
                this.orderService.productId = data.id.toString()
                this.orderService.productTitle = data.title;
              },
              error: error => {
                console.log(error);
                this.router.navigate(['products']).then();
              }
            }
          )
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionProduct?.unsubscribe()
    this.subscriptionRoute?.unsubscribe()
  }

}
