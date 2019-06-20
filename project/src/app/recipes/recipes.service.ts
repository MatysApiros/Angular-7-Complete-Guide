import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shered/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService {

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A supre-testy Schnitzel - just awesome!',
      'https://www.myjewishlearning.com/wp-content/uploads/2007/01/SCHNITZ.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://images1.laweekly.com/imager/u/original/8690577/large-fatburger-burger.jpg',
      [
        new Ingredient('Bread', 2),
        new Ingredient('Meat', 3),
        new Ingredient('Cheese', 4)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient []) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
