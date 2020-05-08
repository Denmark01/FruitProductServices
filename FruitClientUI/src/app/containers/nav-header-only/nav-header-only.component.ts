import { Component, OnInit, ElementRef, ViewChild, isDevMode } from '@angular/core';
@Component({
  selector: 'app-nav-only-header',
  templateUrl: './nav-header-only.component.html',
  styleUrls: ['./nav-header-only.component.css']
})
export class NavHeaderOnlyComponent implements OnInit {
  @ViewChild('navbarToggler') navbarToggler: ElementRef;
  ngOnInit() {

  }

  toggle() {
    console.log('toggle');
    this.navbarToggler.nativeElement.click();
  }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }

}
