import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe";
import {RecipePage} from "../recipe/recipe";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html'
})
export class RecipesPage {
  recipes : Recipe[] = [];

  constructor(private navController : NavController,
              private recipesService : RecipesService) {}
  onNewRecipe() {
    this.navController.push(EditRecipePage, {mode: 'New'});
  }

  ionViewWillEnter() {
    this.recipes = this.loadRecipes();
  }

  private loadRecipes() : Recipe[] {
    return this.recipesService.getRecipes();
  }

  onLoadRecipe(recipe : Recipe, index : number) {
    this.navController.push(RecipePage, {recipe: recipe, index : index});
  }
}
