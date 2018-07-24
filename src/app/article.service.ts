import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Article} from './article';

@Injectable()
export class ArticleService {

  result:any;
  constructor(private _http:Http) { }

  getArticles()
  {
    console.log('get articiles called');
     return this._http.get("/api/all")
     .map(res=>this.result=res.json());
  }

  getArticle(id)
  {
    console.log('called a specific article');
    return this._http.get("api/articles/"+id)
      .map(article => this.result = article.json());
  }

  insertArticle(post: Article){
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({ headers:headers});

    return this._http.post('/api/create',JSON.stringify(post),options)
          .map(result=>this.result = result.json());
  }

  UpdateArticle(post: Article,id) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(post, id);
    post._id = id;
    return this._http.post('/api/update/' + id, JSON.stringify(post), options)
      .map(result => this.result = result.json());
  }

}
