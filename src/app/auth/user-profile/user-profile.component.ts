import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment/comment.service';
import { PostModel } from 'src/app/shared/post-model';
import { CommentPayload } from 'src/app/comment/comment.payload';
import {AuthService} from '../shared/auth.service';

export class Users{
  constructor(

    public id:string,
    public dni:string,
    public firstName:string,
    public lastName:string,
    public username:string,
    public email:string,
    public sex:string,
    public birthday:string,
    public password:string,
    public created:string,
    public enabled:string,
    public role:string = null,
    public homeAddress:string){}
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;
  user : Users;
  roleUser:string;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private commentService: CommentService, private authService: AuthService,) {
    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnInit(): void {
    this.goToUserProfile();
  }

  goToUserProfile() {
    this.authService.goToUserProfile(this.name).subscribe(response => {
      this.user = response;
      // roleUser -> way to avoid some errors in the web console
      this.roleUser = this.user.role;
      // this.router.navigateByUrl('/user-profile/' + this.username);
    });
  }

}
