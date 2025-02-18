import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {OrderService} from "../../shared/services/order.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})



export class OrderComponent implements OnInit, OnDestroy {
  @ViewChild('unsuccessfulResponseElem')
  private unsuccessfulResponseElem!: ElementRef;
  @ViewChild('sendOrderButton')
  private sendOrderButton!: ElementRef;
  public buttonSendPressed: boolean = false;
  public successOrder: boolean = false;
  private subscriptionOrder: Subscription | null = null;
  orderForm = this.fb.group({
    productId: ['', [Validators.required]],
    product: [{value: '', disabled: true}, [Validators.required]],
    firstName: ['', [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]*')]],
    lastName: ['', [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]*')]],
    phone: ['', [Validators.required, Validators.pattern(new RegExp(/^\+?\d{11}$/))]],
    addressGroup: this.fb.group({
      country: ['', [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]*')]],
      zipCode: ['', [Validators.required, Validators.pattern(new RegExp(/^\d{6}$/))]],
      address: ['', [Validators.required, Validators.pattern(new RegExp(/^[-/\\A-Za-zА-Яа-яЁё0-9]*$/))]],

    }),
    commentary: [''],
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              public orderService: OrderService,
              private rend: Renderer2 ) { }

  ngOnInit(): void {
    if (!this.orderService.productTitle) {
      this.router.navigate(['/products']).then();
      return
    }
    this.orderForm.get('product')?.setValue(this.orderService.productTitle);
    this.orderForm.get('productId')?.setValue(this.orderService.productId);
  }

  sendOrder(): void {
    if (this.orderForm.invalid) {
      this.buttonSendPressed = true;
      return
    }
    this.rend.addClass(this.sendOrderButton.nativeElement, 'disabled');
    this.subscriptionOrder = this.orderService.sendOrder(
      {
        name: this.orderForm.get('firstName')?.value,
        last_name: this.orderForm.get('lastName')?.value,
        phone: this.orderForm.get('phone')?.value,
        country: this.orderForm.get('addressGroup')?.get('country')?.value,
        zip: this.orderForm.get('addressGroup')?.get('zipCode')?.value,
        product: this.orderForm.get('productId')?.value,
        address: this.orderForm.get('addressGroup')?.get('address')?.value,
        comment: this.orderForm.get('commentary')?.value,
      }
    )
      .pipe(
        tap(() => {
          this.rend.removeClass(this.sendOrderButton.nativeElement, 'disabled');
        })
      )
      .subscribe(response => {
      if (!response.success) {
        console.log(this.unsuccessfulResponseElem.nativeElement);
        this.rend.removeClass(this.unsuccessfulResponseElem.nativeElement, 'opacity-0');
         setTimeout(() => {
           this.rend.addClass(this.unsuccessfulResponseElem.nativeElement, 'opacity-0');
        }, 3000)
      } else {
        this.successOrder = true
      }
    })
  }

  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
  }

  get firstName() {
    return this.orderForm.get('firstName');
  }

  get lastName() {
    return this.orderForm.get('lastName');
  }

  get phone() {
    return this.orderForm.get('phone');
  }

  get country() {
    return this.orderForm.get('addressGroup')?.get('country');
  }

  get zipCode() {
    return this.orderForm.get('addressGroup')?.get('zipCode');
  }

  get address() {
    return this.orderForm.get('addressGroup')?.get('address');
  }

}
