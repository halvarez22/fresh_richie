export interface ContentData {
  header: HeaderContent;
  music: MusicContent;
  biography: BiographyContent;
  gallery: GalleryContent;
  videos: VideoContent;
  events: Event[];
  news: NewsItem[];
}

export interface HeaderContent {
  title: string;
  subtitle: string;
  backgroundImage: string;
  button1Text: string;
  button2Text: string;
}

export interface MusicContent {
  title: string;
  description: string;
  albumArt: string;
  albumTitle: string;
  artistName: string;
  streamingLinks: StreamingLink[];
}

export interface StreamingLink {
  name: string;
  url: string;
  icon: string;
}

export interface BiographyContent {
  title: string;
  image: string;
  content: string;
}

export interface GalleryContent {
  title: string;
  description: string;
  images: string[];
}

export interface VideoContent {
  videos: Video[];
  featuredVideo?: Video;
}

export interface Video {
  id: number;
  title: string;
  url: string;
  description: string;
  thumbnail?: string;
  isFeatured: boolean;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  ticketLink?: string;
  status: 'upcoming' | 'past' | 'cancelled';
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  image: string;
  category: 'music' | 'events' | 'personal';
}

export interface User {
  username: string;
  password: string;
  role: 'admin' | 'editor';
}
