import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Ingredient } from 'src/app/shered/ingredient.model';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipesService: RecipesService) { }

  ngOnInit() {
  }

  onSendToShoppingList(ingredients: Ingredient[]) {
    this.recipesService.addIngredientToShoppingList(this.recipe.ingredients);
  }

}
