import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../models/recipe";
import {NavParams, NavController} from "ionic-angular";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/shopping-list.service";
import {RecipesService} from "../../services/recipes.service";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html'
})
export class RecipePage implements OnInit {
  recipe : Recipe;
  index : number;
  constructor (private navParams : NavParams, private navCtrl : NavController, private shoppinglistService : ShoppingListService,
  private recipesService : RecipesService) {}

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onAddIngredients() {
    this.shoppinglistService.addItems(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {'mode' : 'Edit', recipe : this.recipe, index : this.index});
  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
