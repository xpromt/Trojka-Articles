import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonBackButton,
  IonNav,
  IonRouterOutlet, IonIcon,
} from '@ionic/angular/standalone';
import {ArticleService} from "../services/article.service";
import {Article} from "../models/Article";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {JsonPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {addIcons} from "ionicons";
import {chevronBack, chevronForward} from "ionicons/icons";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, RouterLink, IonCard, IonCardHeader, IonCardTitle, IonCardContent, NgForOf, NgIf, IonButtons, IonBackButton, IonNav, IonButton, IonRouterOutlet, IonIcon, JsonPipe, NgOptimizedImage],
})
export class HomePage
{
  currentArticleId: number = -1;
  currentArticle: Article = new Article();
  isLastArticle: boolean = false
  currentChildArticles: Article[] = [];

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private routerOutlet: IonRouterOutlet
  ) {
    addIcons({
      'chevron-back': chevronBack,
      'chevron-forward': chevronForward,
    });
  }

  ngOnInit() : void
  {
    this.currentArticleId = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('id'), 10) || -1;

    this.articleService.areArticlesLoaded().subscribe(loaded =>
    {
      if(loaded)
      {
        this.currentArticle = this.articleService.getArticleById(this.currentArticleId);

        this.currentChildArticles = this.articleService.getChildArticles(this.currentArticleId);
        this.isLastArticle = this.articleService.isLastArticle(this.currentArticleId);
      }
    });
  }

  backClick(): void
  {
    const previousArticleId: number = this.currentArticle?.parent || 0;
    if (previousArticleId === 0)
    {
      this.router.navigate(['/home']);
      return;
    }
    this.router.navigate(['/article', previousArticleId]);
  }

  openChildArticle(article: Article): void
  {
    if (this.isLastArticle)
    {
      return;
    }

    this.router.navigate(['/article', article.id]);
  }
}
