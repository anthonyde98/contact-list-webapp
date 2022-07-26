import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-top',
  templateUrl: './btn-top.component.html',
  styleUrls: ['./btn-top.component.css']
})
export class BtnTopComponent implements OnInit {
  windowScrolled: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }
  // When the user scrolls down 20px from the top of the document, show the button
  scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.windowScrolled = true;
    } else {
      this.windowScrolled = false;
    }
  }

// When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } 

}
