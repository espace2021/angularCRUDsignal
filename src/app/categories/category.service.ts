import { Injectable, inject } from '@angular/core';
import { Category } from './category';
import { HttpClient } from '@angular/common/http';
import { categories , idValue} from './categories.signal';


@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private http = inject(HttpClient);
  api="http://localhost:3001/api/categories"

   
  constructor() {
    this.http.get<Category[]>(this.api).subscribe(data => { 
    console.log(data);
    categories.set(data);
 
    });
  
   }

 
  createCategory(category: Category) {
    return this.http.post(this.api+'/' , category).subscribe(((data: any)=>{
        idValue.set(data.id)
        categories.update(categories => {
          categories.push({id:idValue(),nomcategorie:category.nomcategorie,imagecategorie:category.imagecategorie})
              return categories
          })
      }))
    }

  readCategories() {
    return categories;
  }

  updateCategory(category: Category) {
    this.http.put(this.api+ '/' + category.id, category)
    .subscribe(data => {
      console.log(data);
    return categories.update(categories => {
 
      const index = categories.findIndex(t => t.id === category.id);
      categories[index] = category;
      return categories;
    });
  })
  }

  deleteCategory(category: Category) {
    this.http.delete<Category>(this.api + '/' + category.id)
    .subscribe(data => {
      console.log(data);
      return categories.update(categories => categories.filter(t => t.id !== category.id));
    })
    
  }
}

