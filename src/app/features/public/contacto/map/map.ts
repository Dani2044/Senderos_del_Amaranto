import {
  Component, AfterViewInit, OnDestroy,
  ViewChild, ElementRef, Inject, ChangeDetectorRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

interface Attraction {
  name: string;
  category: string;
  lat: number;
  lon: number;
}

interface LegendItem { label: string; color: string; }

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy {
  hotel = {
    name: 'Senderos del Amaranto',
    latitude: '4.4667',
    longitude: '-74.1600'
  };

  plantBg = 'url(https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg)';

  attractions: Attraction[] = [
    { name: 'Parque Entrenubes', category: 'Parque/Mirador', lat: 4.5272, lon: -74.1030 },
    { name: 'Mirador de la Peña', category: 'Parque/Mirador', lat: 4.5180, lon: -74.1120 },
    { name: 'Parque Arborizadora Alta', category: 'Parque/Mirador', lat: 4.5050, lon: -74.1380 },
    { name: 'Embalse La Regadera', category: 'Playa/Isla', lat: 4.4218, lon: -74.1025 },
    { name: 'Cerro Seco (reserva distrital)', category: 'Parque/Mirador', lat: 4.4790, lon: -74.1550 },
    { name: 'Cascada Chorro Blanco', category: 'Parque/Mirador', lat: 4.4500, lon: -74.1700 },
    { name: 'Vía Villavicencio (acceso)', category: 'Transporte', lat: 4.4350, lon: -74.1110 },
    { name: 'Usme pueblo (centro histórico)', category: 'Histórico/Fuerte', lat: 4.4790, lon: -74.1390 }
  ];

  legend: LegendItem[] = [];

  @ViewChild('map', { static: false }) mapEl?: ElementRef<HTMLDivElement>;

  private map?: any;
  private L!: typeof import('leaflet');

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  get hasCoords(): boolean {
    return !!(this.hotel.latitude && this.hotel.longitude);
  }

  get center(): [number, number] {
    return [Number(this.hotel.latitude), Number(this.hotel.longitude)];
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId) || !this.hasCoords || !this.mapEl) return;

    const leaflet = await import('leaflet');
    this.L = leaflet;

    this.map = this.L.map(this.mapEl.nativeElement, {
      zoomControl: true,
      attributionControl: false
    }).setView(this.center, 13);

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    const baseIcon = (fill = '#0a6847') =>
      this.L.divIcon({
        className: 'map-pin',
        html: `<span class="pin" style="--pin:${fill}"></span>`,
        iconSize: [24, 24],
        iconAnchor: [12, 24]
      });

    this.L.marker(this.center, { icon: baseIcon('#0a6847') })
      .addTo(this.map)
      .bindPopup(`<strong>${this.hotel.name}</strong>`);

    const markers: any[] = [];
    this.attractions.forEach(a => {
      const color = this.categoryColor(a.category);
      const m = this.L.marker([a.lat, a.lon], { icon: baseIcon(color) })
        .addTo(this.map)
        .bindPopup(`<strong>${a.name}</strong><br><small>${a.category}</small>`);
      markers.push(m);
    });

    if (markers.length) {
      const group = this.L.featureGroup(markers as any);
      group.addLayer(this.L.marker(this.center));
      this.map.fitBounds(group.getBounds().pad(0.2));
    }

    this.legend = this.buildLegend(this.attractions);
    this.cdr.detectChanges();
    setTimeout(() => this.map?.invalidateSize(), 0);
  }

  ngOnDestroy(): void {
    try { this.map?.remove(); } catch {}
  }

  distanceKm(a: { lat: number; lon: number }): string {
    if (!this.hasCoords) return '—';
    const toRad = (v: number) => v * Math.PI / 180;
    const R = 6371;
    const [lat1, lon1] = this.center;
    const { lat: lat2, lon: lon2 } = a;
    const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
    const s1 = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const d = 2 * R * Math.asin(Math.sqrt(s1));
    return `${d.toFixed(1)} km`;
  }

  private canonicalLabel(cat: string): string {
    const c = cat.toLowerCase();
    if (c.includes('playa') || c.includes('isla')) return 'Playa/Isla';
    if (c.includes('museo')) return 'Museo';
    if (c.includes('hist') || c.includes('fuerte')) return 'Histórico/Fuerte';
    if (c.includes('transporte') || c.includes('aeropuerto')) return 'Transporte';
    if (c.includes('plaza') || c.includes('paseo') || c.includes('pueblo')) return 'Paseo/Plaza';
    if (c.includes('parque') || c.includes('mirador')) return 'Parque/Mirador';
    if (c.includes('arquitect')) return 'Arquitectura';
    return 'Otro';
  }

  private categoryColor(cat: string): string {
    switch (this.canonicalLabel(cat)) {
      case 'Playa/Isla':       return '#1fb38a';
      case 'Museo':            return '#845ef7';
      case 'Histórico/Fuerte': return '#f59f00';
      case 'Transporte':       return '#ef4444';
      case 'Paseo/Plaza':      return '#3b82f6';
      case 'Parque/Mirador':   return '#00b341';
      case 'Arquitectura':     return '#14b8a6';
      default:                 return '#4f46e5';
    }
  }

  private buildLegend(atts: Attraction[]): LegendItem[] {
    const set = new Map<string, string>();
    for (const a of atts) {
      const label = this.canonicalLabel(a.category);
      set.set(label, this.categoryColor(label));
    }
    const out: LegendItem[] = [{ label: 'Hotel', color: '#0a6847' }];
    for (const [label, color] of set) out.push({ label, color });
    return out;
  }
}