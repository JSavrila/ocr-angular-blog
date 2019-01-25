import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogsService } from 'src/app/services/blogs.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import 'firebase/auth';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {

  postForm: FormGroup
  errorMessage: string
  userId: string

  constructor(private formBuilder: FormBuilder, 
    private blogsService: BlogsService, 
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    // créer formulaire à l'initialisation
    this.initForm()
    this.getUserId()
  }

  // création formulaire
  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required]
    })
  }

  // publier un poste
  onAddBlogPost() {
    const title = this.postForm.get('title').value
    const text = this.postForm.get('text').value
    const date = Date.now()
    const newPost = { 
      title: title ,
      text: text, 
      date: date, 
      approval: 0, 
      authorId: this.userId }
    this.blogsService.addPost(newPost)
    .then(() => this.router.navigate(['/blogs']), (error) => this.errorMessage = error)
  }

  // récupérer userID
  getUserId() {
    this.userId = this.authService.getUserID()
  }

}
