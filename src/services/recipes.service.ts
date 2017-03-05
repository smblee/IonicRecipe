
import {Component} from "@angular/core";
import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/Ingredient";
@Component({})
export class RecipesService {
  recipes : Recipe[] = [];

  addRecipe (name : string, description : string, difficulty : string, ingredients : Ingredient[]) {
    this.recipes.push(new Recipe(name, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  getRecipes() : Recipe[] {
    return this.recipes.slice();
  }

  updateRecipes(index : number, name : string, description : string, difficulty : string, ingredients : Ingredient[]) {
    this.recipes[index] = new Recipe(name, description, difficulty, ingredients);
  }

  removeRecipe(index : number) {
    this.recipes.splice(index,1);
  }


}


