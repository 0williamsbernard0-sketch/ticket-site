// lib/events.ts
export type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  price: number;
  image: string;
};

export const events: Event[] = [
  {
    id: "sombr",
    name: "Sombr – You Are The Reason Tour",
    date: "2026-07-10",
    location: "New York",
    price: 120,
    image: "https://images.unsplash.com/photo-1518972559570-7cc1309f3229",
  },
  {
    id: "monsta",
    name: "Monsta X – Nexus Tour",
    date: "2026-08-05",
    location: "Los Angeles",
    price: 150,
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b",
  },
  {
    id: "afrobeats",
    name: "Afrobeats Live Festival",
    date: "2026-09-12",
    location: "Lagos",
    price: 80,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
  },
  {
  id: "bruno-mars",
  name: "Bruno Mars – The Romantic Tour",
  date: "2026-10-01",
  location: "Las Vegas",
  price: 200,
  image: "https://images.unsplash.com/photo-1501612780327-45045538702b",
},
];