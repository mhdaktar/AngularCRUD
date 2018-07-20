import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

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

}
