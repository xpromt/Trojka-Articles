export class Article
{
  id: number;
  date: string;
  date_gmt: string;
  guid: RenderedObject;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: RenderedObject;
  content: ContentObject;
  excerpt: ContentObject;
  featured_media: number;
  parent: number;
  menu_order: number;
  template: string;
  meta: any[];
  video_link: string;
  _links: Links;

  constructor()
  {
    this.id = 0;
    this.date = "";
    this.date_gmt = "";
    this.guid = { rendered: "" };
    this.modified = "";
    this.modified_gmt = "";
    this.slug = "";
    this.status = "";
    this.type = "";
    this.link = "";
    this.title = { rendered: "" };
    this.content = { rendered: "", protected: false };
    this.excerpt = { rendered: "", protected: false };
    this.featured_media = 0;
    this.parent = 0;
    this.menu_order = 0;
    this.template = "";
    this.meta = [];
    this.video_link = "";
    this._links = { self: [], collection: [], about: [], "wp:attachment": [], curies: [] };
  }
}

interface RenderedObject
{
  rendered: string;
}

interface ContentObject extends RenderedObject
{
  protected: boolean;
}

interface Links
{
  self: Link[];
  collection: Link[];
  about: Link[];
  up?: Link[];
  "wp:attachment": Link[];
  curies: Cury[];
}

interface Link
{
  href: string;
  embeddable?: boolean;
}

interface Cury
{
  name: string;
  href: string;
  templated: boolean;
}
