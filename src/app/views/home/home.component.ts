import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/BookDto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Book[] = []
  categories: any[] = [ ]
  constructor(private apiService: ApiService) {
    this.apiService.getBooks().subscribe((res: any[])=>{
      console.log(res)
      res.forEach(v=>{
        v.author = v.authors[0]?.name
      })
     
      this.books = res
    })
    this.apiService.getCategories().subscribe(res=>{
      console.log(res)
      this.categories = res
    })
  }

  ngOnInit(): void {
  }

}
