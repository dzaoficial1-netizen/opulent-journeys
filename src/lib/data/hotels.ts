export interface Hotel {
  id: string;
  name: string;
  stars: number;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  amenities: string[];
  image: string;
  images: string[];
  bestPrice?: boolean;
  about: string;
  distanceFromCenter: number;
}

const img = (url: string) => url;

export const HOTELS: Hotel[] = [
  {
    id: "ritz-paris",
    name: "Hôtel Ritz Paris",
    stars: 5,
    address: "15 Place Vendôme",
    city: "Paris, France",
    rating: 9.4,
    reviewCount: 2847,
    pricePerNight: 890,
    amenities: ["WiFi", "Pool", "Parking", "Gym", "Breakfast", "Spa"],
    image: img("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"),
      img("https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"),
      img("https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800"),
    ],
    bestPrice: true,
    about:
      "An icon of Parisian elegance since 1898, the Ritz offers sumptuous rooms, a world-renowned spa, and Michelin-starred dining steps from the Louvre.",
    distanceFromCenter: 0.5,
  },
  {
    id: "burj-al-arab",
    name: "Burj Al Arab Jumeirah",
    stars: 5,
    address: "Jumeirah St",
    city: "Dubai, UAE",
    rating: 9.6,
    reviewCount: 4521,
    pricePerNight: 1250,
    amenities: ["WiFi", "Pool", "Parking", "Gym", "Breakfast", "Spa"],
    image: img("https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"),
      img("https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800"),
      img("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800"),
    ],
    about:
      "The world's most luxurious hotel, shaped like a sail and offering butler service, private beach, and suites with panoramic Gulf views.",
    distanceFromCenter: 3.2,
  },
  {
    id: "aman-tokyo",
    name: "Aman Tokyo",
    stars: 5,
    address: "1-5-6 Otemachi",
    city: "Tokyo, Japan",
    rating: 9.5,
    reviewCount: 1893,
    pricePerNight: 980,
    amenities: ["WiFi", "Pool", "Gym", "Breakfast", "Spa"],
    image: img("https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1540541338537-1220059af4dc?w=800"),
      img("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800"),
      img("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"),
    ],
    about:
      "A serene urban sanctuary atop the Otemachi Tower, blending traditional Japanese aesthetics with contemporary luxury and city views.",
    distanceFromCenter: 1.1,
  },
  {
    id: "la-mamounia",
    name: "La Mamounia",
    stars: 5,
    address: "Avenue Bab Jdid",
    city: "Marrakech, Morocco",
    rating: 9.3,
    reviewCount: 3204,
    pricePerNight: 420,
    amenities: ["WiFi", "Pool", "Parking", "Gym", "Breakfast", "Spa"],
    image: img("https://images.unsplash.com/photo-1566073770569-32c4c4e5a5c0?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1566073770569-32c4c4e5a5c0?w=800"),
      img("https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800"),
    ],
    bestPrice: true,
    about:
      "A legendary palace hotel set within ancient gardens, offering Moroccan craftsmanship, three pools, and a world-class spa.",
    distanceFromCenter: 0.8,
  },
  {
    id: "santorini-grace",
    name: "Grace Hotel Santorini",
    stars: 5,
    address: "Imerovigli",
    city: "Santorini, Greece",
    rating: 9.7,
    reviewCount: 1567,
    pricePerNight: 650,
    amenities: ["WiFi", "Pool", "Breakfast", "Spa"],
    image: img("https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800"),
      img("https://images.unsplash.com/photo-1613395877344-13d4a8e0d49b?w=800"),
      img("https://images.unsplash.com/photo-1506929562878-bb6043f2cf4d?w=800"),
    ],
    about:
      "Clifftop infinity pools and cave suites carved into the caldera, with sunset views and refined Aegean cuisine.",
    distanceFromCenter: 2.5,
  },
  {
    id: "four-seasons-istanbul",
    name: "Four Seasons Sultanahmet",
    stars: 5,
    address: "Tevkifhane Sk.",
    city: "Istanbul, Türkiye",
    rating: 9.2,
    reviewCount: 2103,
    pricePerNight: 380,
    amenities: ["WiFi", "Pool", "Parking", "Gym", "Breakfast"],
    image: img("https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800"),
      img("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"),
    ],
    about:
      "A converted Ottoman prison in the heart of Sultanahmet, steps from Hagia Sophia with a tranquil courtyard garden.",
    distanceFromCenter: 0.3,
  },
  {
    id: "marina-bay-sands",
    name: "Marina Bay Sands",
    stars: 5,
    address: "10 Bayfront Ave",
    city: "Singapore",
    rating: 9.1,
    reviewCount: 8934,
    pricePerNight: 520,
    amenities: ["WiFi", "Pool", "Parking", "Gym", "Breakfast"],
    image: img("https://images.unsplash.com/photo-1525625293386-3fa89dff36f3?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1525625293386-3fa89dff36f3?w=800"),
      img("https://images.unsplash.com/photo-1566073770569-32c4c4e5a5c0?w=800"),
    ],
    about:
      "Iconic rooftop infinity pool, celebrity chef restaurants, and luxury rooms overlooking Marina Bay.",
    distanceFromCenter: 1.8,
  },
  {
    id: "plaza-new-york",
    name: "The Plaza Hotel",
    stars: 5,
    address: "768 5th Avenue",
    city: "New York, USA",
    rating: 8.9,
    reviewCount: 5621,
    pricePerNight: 720,
    amenities: ["WiFi", "Gym", "Breakfast", "Spa"],
    image: img("https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800"),
      img("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"),
    ],
    about:
      "A New York landmark on Central Park South, offering timeless glamour, afternoon tea, and Fifth Avenue views.",
    distanceFromCenter: 0.6,
  },
  {
    id: "conrad-maldives",
    name: "Conrad Maldives Rangali",
    stars: 5,
    address: "Rangali Island",
    city: "Maldives",
    rating: 9.8,
    reviewCount: 2341,
    pricePerNight: 1450,
    amenities: ["WiFi", "Pool", "Breakfast", "Spa"],
    image: img("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800"),
      img("https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"),
    ],
    about:
      "Overwater villas above crystal-clear lagoons, world-class diving, and the iconic underwater restaurant.",
    distanceFromCenter: 0.1,
  },
  {
    id: "savoy-london",
    name: "The Savoy",
    stars: 5,
    address: "Strand",
    city: "London, UK",
    rating: 9.3,
    reviewCount: 4102,
    pricePerNight: 820,
    amenities: ["WiFi", "Pool", "Gym", "Breakfast", "Spa"],
    image: img("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800"),
      img("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"),
    ],
    about:
      "London's legendary grande dame on the Thames, blending Edwardian glamour with modern British luxury.",
    distanceFromCenter: 0.4,
  },
  {
    id: "w-barcelona",
    name: "W Barcelona",
    stars: 5,
    address: "Plaça de la Rosa dels Vents",
    city: "Barcelona, Spain",
    rating: 9.0,
    reviewCount: 3876,
    pricePerNight: 540,
    amenities: ["WiFi", "Pool", "Gym", "Breakfast"],
    image: img("https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400"),
    images: [
      img("https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"),
      img("https://images.unsplash.com/photo-1566073770569-32c4c4e5a5c0?w=800"),
    ],
    about:
      "A sail-shaped icon on Barceloneta beach with rooftop pool, vibrant nightlife, and Mediterranean views.",
    distanceFromCenter: 1.2,
  },
];

export const HOTEL_ROOMS = [
  {
    type: "Deluxe King",
    size: "35 m²",
    bed: "1 King",
    maxGuests: 2,
    includes: "Breakfast, WiFi",
    price: 0,
  },
  {
    type: "Executive Suite",
    size: "55 m²",
    bed: "1 King + Sofa",
    maxGuests: 3,
    includes: "Breakfast, WiFi, Lounge",
    price: 120,
  },
  {
    type: "Presidential Suite",
    size: "120 m²",
    bed: "2 King",
    maxGuests: 4,
    includes: "All-inclusive, Butler",
    price: 450,
  },
];

export function getHotel(id: string) {
  return HOTELS.find((h) => h.id === id);
}
