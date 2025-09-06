
import type { Track, Show, NewsPost } from './types';

export const TRACKS: Track[] = [
  {
    id: 1,
    title: 'SUPERSTAR',
    // ✅ FOTO REAL DE INSTAGRAM: Portada del single "SUPERSTAR"
    coverArtUrl: '/531422697_18399302527116843_906622902907828631_n.jpg',
    description: 'Latest release from Fresh Richie - a powerful track about ambition and self-belief in the music industry.',
    releaseType: 'Single',
    year: 2025,
    youtubeUrl: 'https://www.youtube.com/embed/VkFNFsPEHos',
    streamingLinks: {
      spotify: 'https://open.spotify.com/intl-es/artist/7sbL1QUMiVmBUCDeLvhmtV',
      appleMusic: '#',
    },
  },
  {
    id: 2,
    title: 'SIENTO QUE MORÍ HACE TIEMPO',
    // ✅ FOTO REAL DE INSTAGRAM: Portada del single "SIENTO QUE MORÍ HACE TIEMPO"
    coverArtUrl: '/537363532_18313699549244158_9142672918536028888_n.jpg',
    description: 'A deep introspective track exploring themes of emotional numbness and the search for meaning in life.',
    releaseType: 'Single',
    year: 2025,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    streamingLinks: {
      spotify: 'https://open.spotify.com/intl-es/artist/7sbL1QUMiVmBUCDeLvhmtV',
      appleMusic: '#',
    },
  },
  {
    id: 3,
    title: 'YA NO SOMOS NADA?',
    // ✅ FOTO REAL DE INSTAGRAM: Portada del single "YA NO SOMOS NADA?"
    coverArtUrl: '/538395238_18401721886116843_4852125496508278674_n.jpg',
    description: 'A song about the confusing and painful end of a relationship, questioning what remains when love fades.',
    releaseType: 'Single',
    year: 2025,
    youtubeUrl: 'https://www.youtube.com/embed/VkFNFsPEHos',
    streamingLinks: {
      spotify: 'https://open.spotify.com/intl-es/artist/7sbL1QUMiVmBUCDeLvhmtV',
      appleMusic: '#',
    },
  },
  {
    id: 4,
    title: 'DIABLA BELLAKITA',
    // ✅ FOTO REAL DE INSTAGRAM: Portada del single "DIABLA BELLAKITA"
    coverArtUrl: '/538664451_18401722042116843_8112695563598619785_n.jpg',
    description: 'A trap-influenced track showcasing Fresh Richie\'s versatility and connection to Latin urban music.',
    releaseType: 'Single',
    year: 2024,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    streamingLinks: {
      spotify: 'https://open.spotify.com/intl-es/artist/7sbL1QUMiVmBUCDeLvhmtV',
      appleMusic: '#',
    },
  },
   {
    id: 5,
    title: 'GLOW UP',
    // ✅ FOTO REAL DE INSTAGRAM: Portada del single "GLOW UP"
    coverArtUrl: '/539394956_1158591479436045_8102039871351401240_n.jpg',
    description: 'An empowering track about personal growth and transformation, reflecting Fresh Richie\'s journey as an artist.',
    releaseType: 'Single',
    year: 2024,
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    streamingLinks: {
      spotify: 'https://open.spotify.com/intl-es/artist/7sbL1QUMiVmBUCDeLvhmtV',
      appleMusic: '#',
    },
  },
];

export const SHOWS: Show[] = [
    { id: 1, date: '2024-09-15', city: 'Los Angeles, CA', venue: 'The Troubadour', ticketLink: '#', status: 'On Sale' },
    { id: 2, date: '2024-09-18', city: 'San Francisco, CA', venue: 'The Fillmore', ticketLink: '#', status: 'On Sale' },
    { id: 3, date: '2024-10-02', city: 'New York, NY', venue: 'Bowery Ballroom', ticketLink: null, status: 'Sold Out' },
    { id: 4, date: '2024-07-20', city: 'Chicago, IL', venue: 'Lincoln Hall', ticketLink: null, status: 'Past' },
    { id: 5, date: '2024-06-12', city: 'Austin, TX', venue: 'The Parish', ticketLink: null, status: 'Past' },
];

export const NEWS_POSTS: NewsPost[] = [
    { 
      id: 1, 
      title: 'Fresh Richie Releases "Gravedad Cero" - New Single Out Now!', 
      date: '2024-08-01', 
      excerpt: 'Fresh Richie\'s latest single "Gravedad Cero" is now available on all streaming platforms. The track showcases his signature blend of electronic influences and heartfelt lyrics.', 
      // ✅ FOTO REAL DE INSTAGRAM: Imagen para noticia "Gravedad Cero"
      imageUrl: '/540528531_17932070973082841_1081480694188249586_n.jpg'
    },
    { 
      id: 2, 
      title: 'Fresh Richie Announces Fall Tour 2024', 
      date: '2024-07-25', 
      excerpt: 'Fresh Richie is hitting the road this fall with dates across major cities. Fans can expect to hear new material from his upcoming album plus fan favorites.', 
      // ✅ FOTO REAL DE INSTAGRAM: Imagen para noticia "Fall Tour"
      imageUrl: '/540595186_18290045410252843_929374919648138090_n.jpg'
    },
    { 
      id: 3, 
      title: 'Fresh Richie\'s "Ecos Rotos" EP: A Deep Dive into the Creative Process', 
      date: '2023-11-10', 
      excerpt: 'Fresh Richie shares the inspiration behind his critically acclaimed "Ecos Rotos" EP, discussing themes of heartbreak, healing, and musical evolution.', 
      // ✅ FOTO REAL DE INSTAGRAM: Imagen para noticia "Studio Diary"
      imageUrl: '/541517994_18402223351116843_2497040528572092467_n.jpg'
    },
];