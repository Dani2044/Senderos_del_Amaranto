import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/public/landing/landing').then(m => m.Landing) 
  },
  { 
    path: 'nosotros', 
    loadComponent: () => import('./features/public/nosotros/nosotros.component').then(m => m.NosotrosComponent) 
  },
  { 
    path: 'programas', 
    loadComponent: () => import('./features/public/programas/programas.component').then(m => m.ProgramasComponent) 
  },
  { 
    path: 'donaciones', 
    loadComponent: () => import('./features/public/donaciones/donaciones.component').then(m => m.DonacionesComponent) 
  },
  { 
    path: 'contacto', 
    loadComponent: () => import('./features/public/contacto/contacto.component').then(m => m.ContactoComponent) 
  },

  { path: '**', redirectTo: '' }
];