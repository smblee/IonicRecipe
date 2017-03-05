import {Component, OnInit} from '@angular/core';
import {NavParams, ActionSheetController, AlertController, ToastController, NavController} from "ionic-angular";
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {Ingredient} from "../../models/Ingredient";
import {ShoppingListService} from "../../services/shopping-list.service";
import {RecipesService} from "../../services/recipes.service";
import {Recipe} from "../../models/recipe";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html'
})
export class EditRecipePage implements OnInit {
  mode : string = 'New';
  selectOptions : string[] = ['Easy', 'Medium', 'Hard'];
  recipeForm : FormGroup;
  items : Ingredient[];

  recipe : Recipe;
  index : number;

  constructor(private navParams : NavParams,
              private shoppingListService : ShoppingListService,
              private actionSheetController : ActionSheetController,
              private alertCtrl : AlertController, private toastCtrl : ToastController,
              private recipesService : RecipesService,
              private navCtrl : NavController) {
  }

  ngOnInit() {
    this.mode = this.navParams.get("mode");
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
    this.loadItems();
  }

  ionViewEnter() {
    this.loadItems();
  }

  private initializeForm() {
    let title = this.recipe == null ? null : this.recipe.title;
    let description = this.recipe == null ? null : this.recipe.description;
    let difficulty = this.recipe == null ? 'Medium' : this.recipe.difficulty;
    let ingredients = [];
    if (this.recipe != null) {
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients' : new FormArray(ingredients)
    });
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0)
      ingredients = value.ingredients.map(name => new Ingredient(name, 1));
    if (this.mode == 'Edit') {
      this.recipesService.updateRecipes(this.index, value.title, value.description, value.difficulty, ingredients);
    } else {
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients(){
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const formArray : FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = formArray.length;
            if (len > 0) {
              for (let i = len-1; i>=0; i--) {
                formArray.removeAt(i);
              }
              this.toastCtrl.create({
                message: 'All ingredients were deleted',
                duration: 1000,
                position: 'bottom'
              }).present();
            //   this.recipeForm.setValue({'ingredients': new FormArray([])});
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();

  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                message: 'Please enter valid value!',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            this.toastCtrl.create({
              message: 'Item added!',
              duration: 1000,
              position: 'bottom'
            }).present();
          }
        }
      ]

    });
  }

  loadItems() {
    this.items = this.shoppingListService.getItems();
  }

}
