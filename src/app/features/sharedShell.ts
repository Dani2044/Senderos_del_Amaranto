import { Directive } from '@angular/core';
import { environment } from '../../environments/environment';

@Directive()
export class ShellBaseComponent {
  today = new Date();
  logoSrc: string;

  private readonly backendBase =
    (environment as any).backendBaseUrl ||
    (environment.apiBaseUrl ? environment.apiBaseUrl.replace(/\/api\/?$/, '') : '');

  constructor() {
    this.logoSrc = this.img('/images/logito.png');
  }

  img(path?: string): string {
    if (!path) return '';
    return path.startsWith('http') ? path : `${this.backendBase}${path}`;
  }
}