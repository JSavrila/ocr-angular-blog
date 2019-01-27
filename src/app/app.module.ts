import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { SingleBlogComponent } from './blog/single-blog/single-blog.component';
import { BlogFormComponent } from './blog/blog-form/blog-form.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BlogsService } from './services/blogs.service';
import { AuthService } from './services/auth.service';
import { NavigationComponent } from './navigation/navigation.component';

const appRoutes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'blogs', canActivate: [AuthGuardService], component: BlogListComponent },
  { path: 'blogs/:id', canActivate: [AuthGuardService], component: SingleBlogComponent },
  { path: 'new', canActivate: [AuthGuardService], component: BlogFormComponent },
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: '**', redirectTo: '/blogs' }
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BlogListComponent,
    SingleBlogComponent,
    BlogFormComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  providers: [AuthGuardService, BlogsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }