import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.subscription = this.recipesService.recipesChanged
      .subscribe((res: Recipe[]) => {
        this.recipes = res;
      });
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}
