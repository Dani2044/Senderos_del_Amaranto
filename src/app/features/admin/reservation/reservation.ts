import { Component } from '@angular/core';

import { ReservationTableComponent } from './reservation-table/reservation-table';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [ReservationTableComponent],
  templateUrl: './reservation.html',
  styleUrls: ['./reservation.css']
})
export class ReservationComponent {}
