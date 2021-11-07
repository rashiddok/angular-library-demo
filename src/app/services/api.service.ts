import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/BookDto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}
  getBooks() {
    return this.http.get(`/api/books`);
  }

  getBook(id: number) {
    return this.http.get(`/api/book/${id}`);
  }
  deleteBook(id: number) {
    return this.http.delete(`/api/book/${id}/delete`);
  }
  addBook(body: Book) {
    return this.http.post(`/api/book/add`, body);
  }

  updateBook(body: Book) {
    return this.http.post(`/api/book/update`, body);
  }
  getAuthors(): Observable<any[]> {
    return this.http.get(`/api/authors`) as Observable<any[]>;
  }

  addAuthor(body: any) {
    return this.http.post(`/api/author/add`, body);
  }
  addBookAuthor(body: any) {
    return this.http.post(`/api/author/book/add`, body);
  }

  getAuthorBooks(id: number) {
    return this.http.get(`/api/author/${id}/books`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get(`/api/categories`) as Observable<any[]>;
  }
  addCategory(body: any) {
    return this.http.post(`/api/category/add`, body);
  }
  addBookCategory(body: any) {
    return this.http.post(`/api/category/add/book`, body);
  }
  addCategoryBooks(id: number) {
    return this.http.get(`/api/category/${id}/books`);
  }
}
