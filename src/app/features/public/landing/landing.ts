import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Primera } from './primera/primera';
import { Senderos } from './senderos/senderos';
import { Detalles } from './detalles/detalles';
import { Stats } from './stats/stats';
import { Testimonials } from './testimonials/testimonials';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-landing',
  imports: [Navbar,Primera, Senderos, Detalles, Stats, Testimonials, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

}
