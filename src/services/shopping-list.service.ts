
import {Component} from "@angular/core";
import {Ingredient} from "../models/Ingredient";
@Component({
})
export class ShoppingListService {
  private items : Ingredient[] = [];

  addItem(name : string, amount : number) {
    this.items.push(new Ingredient(name, amount));
    console.log(this.items);
  }

  addItems(items: Ingredient[]) {
    this.items.push(...items); // ES6 Feature
  }

  getItems() {
    return this.items.slice(); // return a copy !
  }

  removeItem(index: number) {
    this.items.splice(index,1);
    console.log(this.items);
  }
}
