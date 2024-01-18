import { Component, OnInit, signal  } from '@angular/core';
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs';
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
  nomcategorie: "", 
  imagecategorie: ""})

//pour edit
edit = signal(false);
categoryEdited=signal({ 
  id:0,
  nomcategorie: "", 
  imagecategorie: ""})
  
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.readCategories();
  }

  createCategory() {
    this.categoryService.createCategory(this.newcategory()).subscribe(((data: any)=>{console.log(data)}))
   
    this.newcategory.set({
      nomcategorie: "", imagecategorie: ""
    });
  }

  deleteCategory(category:Category):void {
    this.categoryService.deleteCategory(category)
  }

  editCategory(category:Category):void {
    this.categoryEdited.set({
     id:Number(category.id), nomcategorie: category.nomcategorie, imagecategorie: category.imagecategorie
    });
    this.edit.set(true);
    console.log(this.categoryEdited())
  }

  updateCategory():void {
    console.log(this.categoryEdited())
    this.categoryService.updateCategory(this.categoryEdited())
  }

  annuler():void {
    this.edit.set(false);
  }

  
}
