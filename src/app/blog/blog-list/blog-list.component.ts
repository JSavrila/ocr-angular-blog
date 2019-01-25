import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit, OnDestroy {

  // créer array de post
  posts: any[] = []
  // Souscription
  postsSubscription = new Subscription

  constructor(private blogsService: BlogsService, private router: Router) { }

  // récupérer les posts à l'initialisation du component
  ngOnInit() {
    this.blogsService.getPosts()
    this.postsSubscription = this.blogsService.postsSubject.subscribe(
      (posts: any[]) => {
        this.posts = posts
      }
    )
  }

  // rediriger vers la page blogForm
  onNewPost() {
    this.router.navigate(['/new'])
  }

  // arrêter souscription pour libérer de la mémoire
  ngOnDestroy() {
    this.postsSubscription.unsubscribe()
  }

}
