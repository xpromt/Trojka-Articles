import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, BehaviorSubject, map} from 'rxjs';
import { Article } from "../models/Article";

@Injectable({ providedIn: 'root' })
export class ArticleService
{
  private apiUrl: string = 'https://trojka.creavi.dk/wp-json/wp/v2/articles?&_embed=true&per_page=100';
  private articles: Article[] = [];
  private articlesLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient)
  {
    this.fetchAllArticles().subscribe(data =>
    {
      this.articles = data;
      this.articlesLoaded.next(true);
    });
  }

  fetchAllArticles(): Observable<Article[]>
  {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(articles => articles.map(article => ({
        id: article.id,
        parent: article.parent,
        title: article.title.rendered,
        content: article.content.rendered,
        excerpt: article.excerpt.rendered,
        video_link: article.video_link,
        picture: article._embedded?.['wp:featuredmedia']?.[0]?.source_url || "./assets/img/Placeholder_view_vector.svg" // http://localhost:8100/src/assets/img/Placeholder_view_vector.svg
      }) as Article))
    );
  }

  getAllArticles(): Article[]
  {
    if (!this.articles.length)
    {
      throw new Error("Articles not loaded yet");
    }

    return this.articles;
  }

  getArticleById(id: number): Article
  {
    if (!this.articles.length)
    {
      throw new Error("Articles not loaded yet");
    }

    return this.articles.find(article => article.id === id) as Article || this.articles[0];
  }

  isLastArticle(id: number): boolean
  {
    if (!this.articles.length)
    {
      throw new Error("Articles not loaded yet");
    }
    if (id === -1)
    {
      return false;
    }

    return this.articles.filter(article => article.parent === id).length === 0;
  }

  getChildArticles(parentId: number): Article[]
  {
    if (!this.articles.length)
    {
      throw new Error("Articles not loaded yet");
    }

    if (parentId === -1)
    {
      return this.articles.filter(article => article.parent === 0);
    }
    else
    {
      return this.articles.filter(article => article.parent === parentId);
    }
  }

  areArticlesLoaded(): Observable<boolean>
  {
    return this.articlesLoaded.asObservable();
  }
}
