import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../article.service';
import { Article } from '../article';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  article: Article;
  articleFrm: FormGroup;
  articles: Array<Article>;
  constructor(private _articleService: ArticleService, private router: Router, private aR: ActivatedRoute, private fb: FormBuilder) { }


  ngOnInit() {
    this._articleService.getArticles()
      .subscribe(res => this.articles = res);

    this.aR.params.subscribe((params) => {
      if (params['id']) {
        this._articleService.getArticle(params['id'])
          .subscribe(res => {
            this.article = res;
            this.articleFrm = this.fb.group({
              'title': [this.article['title'], Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(45)])],
              'content': [this.article['content'], Validators.compose([Validators.required, Validators.minLength(10)])],
            });
          })
      }
      else {
        this.articleFrm = this.fb.group({
          'title': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(45)])],
          'content': [null, Validators.compose([Validators.required, Validators.minLength(10)])],
        });
      }
    });


  }

  addArticle(articleid, article: Article) {
    if (typeof (articleid) !== 'undefined') {
      console.log('Entered in article update');
      article._id = articleid._id;
      this._articleService.UpdateArticle(article, article._id)
        .subscribe(updateArticle => {
          this.router.navigateByUrl('/');
        })

    }
    else {
      console.log('Entered in article insert');
      this._articleService.insertArticle(article)
        .subscribe(newArticle => {
          this.articles.push(newArticle);
          this.router.navigateByUrl('/');
        })
    }
  }

}
