import { Component, OnInit, signal  } from '@angular/core';
import { CategoryService } from '../category.service';
import { Category } from '../category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {

  // pour la liste 
categories$: any;

//pour add
newcategory=signal({ 
  id : 0,
  nomcategorie: "", 
  imagecategorie: ""})

//pour edit
edit = signal(false);
  
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.readCategories();
  }

  createCategory() {
    this.categoryService.createCategory(this.newcategory());
    this.newcategory.set({
    id:0,  nomcategorie: "", imagecategorie: ""
    });
 
  }

  deleteCategory(category:Category):void {
    this.categoryService.deleteCategory(category)
  }

  editCategory(category:Category):void {
    this.newcategory.set({
     id:Number(category.id), nomcategorie: category.nomcategorie, imagecategorie: category.imagecategorie
    });
    this.edit.set(true);
    console.log(this.newcategory())
  }

  updateCategory():void {
    console.log(this.newcategory())
    this.categoryService.updateCategory(this.newcategory())
  }

  annuler():void {
    this.edit.set(false);
    this.newcategory.set({
      id:0,  nomcategorie: "", imagecategorie: ""
      });
  }

  
}
