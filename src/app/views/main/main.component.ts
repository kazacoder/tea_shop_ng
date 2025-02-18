import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PopupComponent} from "../../shared/components/popup/popup.component";
declare var $: any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private popupObservable: Observable<void>;
  private popupSubscription: Subscription | null = null;

  constructor(private popup: MatDialog) {
    this.popupObservable = new Observable<void>((observer) => {
      const timeout = setTimeout(() => {
        observer.next();
      }, 10000)
      return {
        unsubscribe() {
          clearTimeout(timeout)
        }
      }
    })
  }

  ngOnInit(): void {

    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = {
      id: 1,
      title: 'Каталог'
    }

    this.popupSubscription = this.popupObservable?.subscribe({
      next: () => {
        this.popup.open(PopupComponent, dialogConfig)
      }
    })

    // slick slider init + settings
    $('.slider').slick({
      dots: false,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: 'linear',
      responsive: [
        {breakpoint: 1400,},
        {breakpoint: 1200,},
        {breakpoint: 992,},
        {breakpoint: 768,},
        {breakpoint: 425,},
        {breakpoint: 375,},
        {breakpoint: 320,},
      ]
    });

    // JQueryUI accordion init and customizing
    let icons = {
      header: "custom-icon-caret-down",
      activeHeader: "custom-icon-caret-up"
    };

    $("#accordion").accordion({
      icons: icons,
      heightStyle: "content"
    });
  }

  ngOnDestroy() {
    this.popupSubscription?.unsubscribe()
  }

}
