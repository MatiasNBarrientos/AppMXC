export interface Beat {
  id: string;
  title: string;
  producer: string;
  genre: string;
  image: any;
  price: number;
  audio: any;
  bpm: number;      
  scale: string;   
}

export const featuredBeats: Beat[] = [
  {
    id: '1',
    title: 'Summer Vibes',
    producer: 'Lautti',
    genre: 'Pop',
    image: require('@/src/assets/images/placeholder.png'),
    price: 29.99,
    audio: require('../assets/audios/beat1.wav'),
    bpm: 145,
    scale: 'F Minor',
  },
  {
    id: '2',
    title: 'winter Chill',
    producer: 'Lautti',
    genre: 'Pop',
    image: require('@/src/assets/images/placeholder.png'),
    price: 19.99,
    audio: require('../assets/audios/sample.wav'),
    bpm: 90,
    scale: 'A Minor',
  },
  {
    id: '3',
    title: 'Urban Beats',
    producer:'Lautti',
    genre: 'Hip-Hop',
    image: require('@/src/assets/images/placeholder.png'),
    price: 24.99,
    audio: require('../assets/audios/beat2.wav'),
    bpm: 140,
    scale: 'D Minor',
  },
  {
    id: '4',
    title: 'Electronic Dreams',
    producer: 'Lautti',
    genre: 'EDM',
    image: require('@/src/assets/images/placeholder.png'),
    price: 34.99,
    audio: require('../assets/audios/beat3.wav'),
    bpm: 128,
    scale: 'F# Minor',
  },
];