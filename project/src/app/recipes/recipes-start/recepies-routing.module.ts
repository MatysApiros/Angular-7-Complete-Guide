import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from '../recipes.component';
import { AuthGuardGuard } from '../../auth/auth/auth-guard.guard';
import { RecipesStartComponent } from './recipes-start.component';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';
import { RecipesDetailComponent } from '../recipes-detail/recipes-detail.component';
import { RecipesResolverService } from '../recipes-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [ AuthGuardGuard ],
    children: [
      { path: '', component: RecipesStartComponent },
      { path: 'new', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipesDetailComponent,
        resolve: [ RecipesResolverService ],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [ RecipesResolverService ],
      }
    ]
  },
  // { path: '', component: },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RecepiesRoutingModule {}
