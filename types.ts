
export interface Track {
  id: number;
  title: string;
  coverArtUrl: string;
  description: string;
  releaseType: 'Single' | 'EP' | 'Album';
  year: number;
  youtubeUrl: string;
  streamingLinks: {
    spotify: string;
    appleMusic: string;
  };
}

export interface Show {
    id: number;
    date: string;
    city: string;
    venue: string;
    ticketLink: string | null;
    status: 'On Sale' | 'Sold Out' | 'Past';
}

export interface NewsPost {
    id: number;
    title: string;
    date: string;
    excerpt: string;
    imageUrl: string;
}