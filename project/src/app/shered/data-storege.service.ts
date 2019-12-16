import { Injectable } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
  ) {}

  put() {
    const recipes = this.recipesService.getRecipes();
    this.http
      .put('https://ng-course-recipe-book-205ac.firebaseio.com/recipes.json', recipes)
      .subscribe(res => {
        console.log(res);
      });
  }

  get() {
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-205ac.firebaseio.com/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            } as Recipe;
          });
        }),
        tap(res => {
          this.recipesService.setRecipes(res);
        })
      );
  }
}
