import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Ingredient} from "../../models/Ingredient";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})

export class ShoppingListPage {
  items : Ingredient[];
  constructor(private shoppingListService : ShoppingListService) {

  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount);
    form.reset(); // RESET THE VALIDATION STATE, ETC.
    this.loadItems();
  }

  onCheckItem(index : number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
  }

  loadItems() {
    this.items = this.shoppingListService.getItems();
  }

}
