import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/BookDto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book: Book = {
    id: 1,
    name: 'Сказания Меекханского пограничья',
    cover: 'https://via.placeholder.com/150',
    description: 'Цикл произведений в жанре фэнтези польского писателя Роберта М. Вегнера. Цикл состоит из четырёх сборников новелл, каждый из которых посвящён одному из регионов вымышленного мира саги и объединён общими персонажами, а также из нескольких романов.',
    issuedBy: 'Минск',
    link: 'https://knigogo.net/wp-content/uploads/2018/05/skazaniya-meekhanskogo-pogranichya-vostok-zapad-21992184.txt',
    year: 2011,
    author: 'Роберт М. Вегнер',
    category: 'Фантастика'
  }
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
    this.route.params.subscribe(res=>{
      this.apiService.getBook(res?.id).subscribe((res: any)=>{
        if(res.authors){
          res.author = res.authors[0]?.name
        }
        this.book = res
      })
    })
  }

  ngOnInit(): void {
  }

  deleteBook(){
    this.apiService.deleteBook(this.book.id).subscribe(res=>{
      console.log(res)
      this.router.navigateByUrl('/books')
    })
  }

  changeBook(){
    this.router.navigate(['book-add'], {
      queryParams: {
        bookId: this.book.id
      }
    })
  }

}
