import { Component, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

}
