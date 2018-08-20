import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  responsive = 'menu';
  header = 'header';
  headerFloat = '';
  float = '';
  items: MenuItem[];
  show = false;

  ngOnInit() {
    console.log(window.screen.width.toString());
    if (window.screen.width <= 600) {
      this.items = [
        {  icon: 'pi pi-bars', items: [
          { label: 'Home', icon: 'fa fa-refresh', routerLink: [''] },
          { label: 'Empleado', icon: 'fa fa-refresh', routerLink: ['empleados'] },
          { label: 'Proveedores', icon: 'fa fa-close', routerLink: ['proveedores'] },
          { label: 'Cabañas', icon: 'fa fa-close', routerLink: ['cabañas'] }
        ] }
      ];
    } else {
      this.items = [
        { label: 'Empleado', icon: 'fa fa-refresh', routerLink: ['empleados'] },
        { label: 'Home', icon: 'fa fa-close', routerLink: [''] },
        { label: 'Proveedores', icon: 'fa fa-close', routerLink: ['proveedores'] },
        { label: 'Cabañas', icon: 'fa fa-close', routerLink: ['cabañas'] }
      ];
    }
  }

  click() {
    console.log(window.screen.width.toString());
    if (this.responsive === 'menu') {
      this.responsive += ' responsive';
    } else {
      this.responsive = 'menu';
    }
  }
  /*
  @HostListener('window:scroll', ['$event'])
   shot(event) {
  //  console.log('scrollTop: ' + event.target.scrollingElement.scrollTop);
  if (event.target.scrollingElement.scrollTop > 60) {
      this.float = ' float';
      this.headerFloat = '';

    } else if (event.target.scrollingElement.scrollTop < 70) {
      this.float = '';
      this.headerFloat = '';

    }
  }*/
}
