export interface IRssFeed {
  id: string;
  createdAt?: Date;
  feedUrl?: string;
  image: string;
  link: string;
  title: string;
  type: 'following' | 'manage';
}
