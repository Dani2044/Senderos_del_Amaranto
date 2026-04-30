import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Primera } from './primera/primera';
import { Hoteles } from './hoteles/hoteles';
import { Details } from './details/details';
import { Stats } from './stats/stats';
import { Testimonials } from './testimonials/testimonials';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-landing',
  imports: [Navbar,Primera, Hoteles, Details, Stats, Testimonials, Footer],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

}
