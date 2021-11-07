import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/BookDto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  books: Book[] = []
  categories: any[] = [ ]
  constructor(private route: ActivatedRoute, private apiService: ApiService) { 
    this.route.queryParams.subscribe(res=>{
      console.log(res)
    })
    this.apiService.getBooks().subscribe((res: any[])=>{
      console.log(res)
      res.forEach(v=>{
        v.author = v.authors[0]?.name
      })
     
      this.books = res
    })
    this.apiService.getCategories().subscribe(res=>{
      console.log(res)
      res.forEach(v=>{
        v.author = v.authors[0]?.name
      })
      this.categories = res
    })
  }

  ngOnInit(): void {
  }

}
