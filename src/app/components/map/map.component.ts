import { Component, Input, AfterViewInit, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #mapContainer style="height: 300px; width: 100%;" *ngIf="coordinates"></div>
  `
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() coordinates?: [number, number];
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  private map: any;
  private marker: any;

  ngAfterViewInit(): void {
    if (this.coordinates) {
      this.initMap();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coordinates'] && !changes['coordinates'].firstChange && this.map) {
      this.updateMap();
    }
  }

  private async initMap(): Promise<void> {
    const L = await import('leaflet'); // ← Import dynamique ici
    const [lat, lng] = this.coordinates!;

    this.map = L.map(this.mapContainer.nativeElement).setView([lat, lng], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([lat, lng]).addTo(this.map);
  }

  private async updateMap(): Promise<void> {
    const L = await import('leaflet');
    const [lat, lng] = this.coordinates!;

    this.map!.setView([lat, lng], 5);
    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
    } else {
      this.marker = L.marker([lat, lng]).addTo(this.map!);
    }
  }
}
