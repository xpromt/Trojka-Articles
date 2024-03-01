export class Article
{
  id: number;
  parent: number;
  title: RenderedObject;
  content: RenderedObject;
  excerpt: RenderedObject;
  video_link: string;
  picture?: string;

  constructor()
  {
    this.id = -1;
    this.parent = -1;
    this.title = { rendered: "" };
    this.content = { rendered: "" };
    this.excerpt = { rendered: "" };
    this.video_link = "";
    this.picture = "";
  }
}

interface RenderedObject
{
  rendered: string;
}
