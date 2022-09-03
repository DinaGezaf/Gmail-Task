import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `<app-sidenav></app-sidenav>`,
})
export class AppComponent {
  constructor(private primengConfig: PrimeNGConfig) {}
}
