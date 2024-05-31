import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'asegurado-list',
    loadChildren: () => import('./clientes/asegurado-list/asegurado-list.module').then( m => m.AseguradoListPageModule)
  },
  {
    path: 'asegurado-new',
    loadChildren: () => import('./clientes/asegurado-edit/asegurado-edit.module').then( m => m.AseguradoEditPageModule)
  },
  {
    path: 'asegurado-edit/:id',
    loadChildren: () => import('./clientes/asegurado-edit/asegurado-edit.module').then( m => m.AseguradoEditPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
