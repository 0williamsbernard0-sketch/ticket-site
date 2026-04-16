export type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  /** Internal use only — don’t render until seat selection / checkout */
  price: number;
  image: string;
};
export const events: Event[] = [
  {
    id: "sombr",
    name: "Sombr – You Are The Reason Tour",
    price: 120,
    image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
  },
  {
    id: "monsta",
    name: "Monsta X – Nexus Tour",
    price: 150,
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b",
  },
  {
    id: "afrobeats",
    name: "Afrobeats Live Festival",
    price: 80,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
  },
];