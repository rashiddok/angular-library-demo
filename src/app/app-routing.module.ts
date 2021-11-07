import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorComponent } from './views/author/author.component';
import { AuthorsComponent } from './views/authors/authors.component';
import { BookUpdateComponent } from './views/book-update/book-update.component';
import { BookComponent } from './views/book/book.component';
import { BooksComponent } from './views/books/books.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'book/:id', component: BookComponent
  },
  {
    path: 'books', component: BooksComponent
  },
  {path: 'book-add', component: BookUpdateComponent},
  {
    path: 'authors', component: AuthorsComponent
  },
  {
    path: 'author/:id', component: AuthorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
