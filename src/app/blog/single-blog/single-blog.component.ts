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
  @Input() postCreationDate: number

  constructor(private blogsService: BlogsService) { }

  ngOnInit() {
  }

  // supprimer le document ayant l'id bindé en postId
  onDeletePost() {
    this.blogsService.deleteSinglePost(this.postId)
  }

}
