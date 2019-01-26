import { Component, OnInit, Input } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss']
})
export class SingleBlogComponent implements OnInit {

  @Input() index: number
  @Input() postId: string
  @Input() postTitle: string
  @Input() postText: string
  @Input() postApproval: number
  @Input() postCreationDate: number

  constructor(private blogsService: BlogsService) { }

  ngOnInit() {
  }

  // couleur des avis en fonction des upvote/downvote
  getColor() {
    if(this.postApproval == 0) {
      return 'black';
    }
    else if(this.postApproval > 0) {
      return 'green'
    }
    else { return 'red' }
  }

  // approuver
  onUpvote() {
    this.blogsService.upvote(this.postId)
  }

  // désapprouver
  onDownvote() {
    this.blogsService.downvote(this.postId)
  }

  // supprimer le document ayant l'id bindé en postId
  onDeletePost() {
    this.blogsService.deleteSinglePost(this.postId)
  }

}
