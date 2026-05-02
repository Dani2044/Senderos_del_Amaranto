import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { MapComponent } from './map/map';

@Component({
  selector: 'app-contacto',
  imports: [Navbar, MapComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {

}
