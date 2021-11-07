import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {

  bookForm: FormGroup
  authors: any[] = []
  categories: any[] = []
  isUpdate = true
  constructor(
    private apiService: ApiService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookForm = this._fb.group({
      id: [null],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      year: [null, [Validators.required]],
      issuedBy: [null, [Validators.required]],
      cover: [null, [Validators.required]],
      link: [null, [Validators.required]],
      pages: [null, [Validators.required]],
      author: [null, [Validators.required]],
      category: [null, [Validators.required]],
    })
    this.route.queryParams.subscribe(res=>{
      if(res?.bookId){
        this.isUpdate = true
        this.getBook(res.bookId)
      }
    })
    this.getAuthors()
    this.getCategories()
  }

  ngOnInit(): void {
  }

  getBook(id: number){
    this.apiService.getBook(id).subscribe((res: any)=>{
      console.log(res)
      this.bookForm.get('name').setValue(res.name)
      this.bookForm.get('description').setValue(res.description)
      this.bookForm.get('year').setValue(res.year)
      this.bookForm.get('issuedBy').setValue(res.issuedBy)
      this.bookForm.get('cover').setValue(res.cover)
      this.bookForm.get('pages').setValue(res.pages)
      if(res.authors){
        this.bookForm.get('author').setValue(res.authors[0]?.id)
      }
      this.bookForm.get('link').setValue(res.link)
      this.bookForm.get('category').setValue(res.categories[0]?.id)
      this.bookForm.get('id').setValue(res.id)
    })
  }

  getAuthors(){
    this.apiService.getAuthors().subscribe(res=>{
      this.authors = res
    })
  }

  getCategories(){
    this.apiService.getCategories().subscribe(res=>{
      this.categories = res
    })
  }

  addAuthor(){
    const authorNameInput = document.querySelector('#newAuthor') as HTMLInputElement
    if(authorNameInput.value?.length > 10){
      const body = {
        name: authorNameInput.value
      }
      this.apiService.addAuthor(body).subscribe(res=>{
        authorNameInput.value = ''
        this.getAuthors()
      })
    }
  }

  submit(){
    this.bookForm.markAllAsTouched()
    if(this.bookForm.invalid){
      return
    }
    if(!this.isUpdate){
      this.addBook()
      return
    }
    this.updateBook()
  }

  updateBook(){
    const book = this.bookForm.value
    console.log(book)
    this.apiService.updateBook(book).subscribe((res: any)=>{
      const bookId = res?.id
      const bookAuthorBody = {
        bookId: bookId,
        authorId: this.bookForm.get('author').value
      }
      const bookCategoryBody = {
        bookId: bookId,
        categoryId: this.bookForm.get('category').value
      }
      this.apiService.addBookAuthor(bookAuthorBody).subscribe(res=>{
      })
      this.apiService.addBookCategory(bookCategoryBody).subscribe(res=>{
      })
      this.router.navigate([''])
    })
   
  }
  addBook(){
    const book = this.bookForm.value
    console.log(book)
    delete book.id
    this.apiService.addBook(book).subscribe((res: any)=>{
      console.log(res)
      const bookId = res?.id
      const bookAuthorBody = {
        bookId: bookId,
        authorId: this.bookForm.get('author').value
      }
      const bookCategoryBody = {
        bookId: bookId,
        categoryId: this.bookForm.get('category').value
      }
      this.apiService.addBookAuthor(bookAuthorBody).subscribe(res=>{
        res
      })
      this.apiService.addBookCategory(bookCategoryBody).subscribe(res=>{
        console.log(res)
      })
      this.router.navigate([''])
    })
  }

}
