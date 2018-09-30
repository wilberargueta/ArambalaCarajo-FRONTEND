import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private rout: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['/login'], { relativeTo: this.rout });
    }
    if (window.screen.width <= 600) {
      this.items = [
        {
          icon: 'pi pi-bars',
          routerLink: ['empleados'],
          items: [
            { label: 'Home', icon: 'fa fa-refresh', routerLink: [''] },
            {
              label: 'Empleado',
              icon: 'fa fa-refresh',
              routerLink: ['empleados'],

            },
            {
              label: 'Proveedores',
              icon: 'fa fa-close',
              routerLink: ['proveedores']
            },
            { label: 'Cabañas', icon: 'fa fa-close', routerLink: ['cabañas'] },
            { label: 'Compras', icon: 'fa fa-close', routerLink: ['compras'] },
            {
              label: 'Productos',
              icon: 'fa fa-close',
              routerLink: ['productos']
            },
            { label: 'Recetas', icon: 'fa fa-close', routerLink: ['recetas'] },
            {
              label: 'Categorias',
              icon: 'fa fa-close',
              routerLink: ['categorias']
            },
            { label: 'Menus', icon: 'fa fa-close', routerLink: ['menus'] },
            {
              label: 'Servicios',
              icon: 'fa fa-close',
              routerLink: ['servicios']
            },
            {
              label: 'Usuarios',
              icon: 'fa fa-close',
              routerLink: ['usuarios']
            },
            { label: 'Login', icon: 'fa fa-close', routerLink: ['login'] }
          ]
        },
        {
          icon: 'pi pi-bars',
          routerLink: ['logout'],

        }
      ];
    } else {
      this.items = [
        { label: 'Empleado', icon: 'fa fa-refresh', routerLink: ['empleados'] },
        { label: 'Home', icon: 'fa fa-close', routerLink: [''] },
        {
          label: 'Proveedores',
          icon: 'fa fa-close',
          routerLink: ['proveedores']
        },
        { label: 'Cabañas', icon: 'fa fa-close', routerLink: ['cabañas'] },
        { label: 'Compras', icon: 'fa fa-close', routerLink: ['compras'] },
        { label: 'Productos', icon: 'fa fa-close', routerLink: ['productos'] },
        { label: 'Recetas', icon: 'fa fa-close', routerLink: ['recetas'] },
        {
          label: 'Categorias',
          icon: 'fa fa-close',
          routerLink: ['categorias']
        },
        { label: 'Menus', icon: 'fa fa-close', routerLink: ['menus'] },
        { label: 'Servicios', icon: 'fa fa-close', routerLink: ['servicios'] },
        { label: 'Usuarios', icon: 'fa fa-close', routerLink: ['usuarios'] },
        { label: 'Login', icon: 'fa fa-close', routerLink: ['login'] }
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
