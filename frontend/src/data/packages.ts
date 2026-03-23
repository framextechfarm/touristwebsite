export interface Package {
  id: number;
  title: string;
  slug: string;
  duration: string;
  description: string;
  price: number;
  location: string;
  isFeatured: boolean;
  rating: number;
  images: { url: string }[];
  itinerary: { day: number; title: string; description: string }[];
}

export const staticPackages: Package[] = [
  {
    id: 1,
    title: "TOUR 1: VALLEY TOUR",
    slug: "valley-tour",
    duration: "1 Day",
    description: "Explore the heart of Kodaikanal. From the historic Coakers Walk to the breathtaking Pillar Rocks, witness the valley's most iconic landmarks.",
    price: 400,
    location: "Kodaikanal",
    isFeatured: true,
    rating: 4.9,
    images: [{ url: "/images/tours/valley.png" }],
    itinerary: [
      { day: 1, title: "Coakers walk", description: "Visiting Coakers walk" },
      { day: 1, title: "La saleth church", description: "Visiting La saleth church" },
      { day: 1, title: "Pambar Falls", description: "Visiting Pambar Falls" },
      { day: 1, title: "Shopping Place", description: "Visiting Shopping Place" },
      { day: 1, title: "Green Valley View", description: "Visiting Green Valley View" },
      { day: 1, title: "Pillar Rock", description: "Visiting Pillar Rock" },
      { day: 1, title: "Guna Cave", description: "Visiting Guna Cave" },
      { day: 1, title: "500 years old tree", description: "Visiting 500 years old tree" },
      { day: 1, title: "Pine Tree Forest", description: "Visiting Pine Tree Forest" },
      { day: 1, title: "Moir Point", description: "Visiting Moir Point" },
      { day: 1, title: "Vaigai Dam View", description: "Visiting Vaigai Dam View" },
      { day: 1, title: "Bryant Park", description: "Visiting Bryant Park" },
      { day: 1, title: "Kodaikanal Lake or City Drop", description: "Visiting Kodaikanal Lake or City Drop" }
    ]
  },
  {
    id: 2,
    title: "TOUR 2: VILLAGE TOUR",
    slug: "village-tour",
    duration: "1 Day",
    description: "Experience the authentic rural charm of Kodaikanal. Visit ancient temples, agricultural terraces, and peaceful farms for a glimpse into local life.",
    price: 600,
    location: "Kodaikanal Villages",
    isFeatured: true,
    rating: 4.8,
    images: [{ url: "/images/tours/village.png" }],
    itinerary: [
      { day: 1, title: "Palani View", description: "Visiting Palani View" },
      { day: 1, title: "Mahalakshmi Temple", description: "Visiting Mahalakshmi Temple" },
      { day: 1, title: "Poombari village view", description: "Visiting Poombari village view" },
      { day: 1, title: "Kulanthai Vellappar Temple", description: "Visiting Kulanthai Vellappar Temple" },
      { day: 1, title: "Sheep & Rabbit Farm", description: "Visiting Sheep & Rabbit Farm" },
      { day: 1, title: "Mannavanur Lake", description: "Visiting Mannavanur Lake" },
      { day: 1, title: "Kodaikanal Lake or City Drop", description: "Visiting Kodaikanal Lake or City Drop" }
    ]
  },
  {
    id: 3,
    title: "TOUR 3: WILD WAYS TOUR",
    slug: "wild-ways-tour",
    duration: "1 Day",
    description: "Venture into the restricted forest areas and serene lakes. Experience the 'Memory Loss Forest' and the pristine beauty of Berijam Lake area.",
    price: 500,
    location: "Berijam / Forest Area",
    isFeatured: true,
    rating: 4.7,
    images: [{ url: "/images/tours/wild-ways.png" }],
    itinerary: [
      { day: 1, title: "Silent Valley View", description: "Visiting Silent Valley View" },
      { day: 1, title: "Berijam Lake view", description: "Visiting Berijam Lake view" },
      { day: 1, title: "Caps Fly Valley", description: "Visiting Caps Fly Valley" },
      { day: 1, title: "Mathikettan Forest view", description: "Visiting Mathikettan Forest view" },
      { day: 1, title: "Berijam Lake", description: "Visiting Berijam Lake" },
      { day: 1, title: "Kodaikanal Lake or City Drop", description: "Visiting Kodaikanal Lake or City Drop" }
    ]
  },
  {
    id: 4,
    title: "TOUR 4: TREKKING TOUR",
    slug: "trekking-tour",
    duration: "1 Day",
    description: "For the active adventurer. A trekking focused tour visiting hidden falls and the famous Dolphin's Nose for spectacular cliff-side views.",
    price: 0,
    location: "Vattakanal / Dolphin Nose",
    isFeatured: true,
    rating: 4.9,
    images: [{ url: "/images/tours/trekking.png" }],
    itinerary: [
      { day: 1, title: "La Saleth Church", description: "Visiting La Saleth Church" },
      { day: 1, title: "500 years old Tree", description: "Visiting 500 years old Tree" },
      { day: 1, title: "Vattakanal Falls", description: "Visiting Vattakanal Falls" },
      { day: 1, title: "Fairy Falls", description: "Visiting Fairy Falls" },
      { day: 1, title: "Mountain Beauty", description: "Visiting Mountain Beauty" },
      { day: 1, title: "Dolphin Nose", description: "Visiting Dolphin Nose" },
      { day: 1, title: "Kodaikanal Lake or City Drop", description: "Visiting Kodaikanal Lake or City Drop" }
    ]
  },
  {
    id: 5,
    title: "TOUR 5: ADVENTURE JEEP SAFARI",
    slug: "adventure-jeep-safari",
    duration: "1 Day",
    description: "Go off-the-beaten-path with an exhilarating jeep safari. Visit remote viewpoints and hidden waterfalls accessible only by 4x4 vehicles.",
    price: 0,
    location: "Kodaikanal Off-Road",
    isFeatured: true,
    rating: 5,
    images: [{ url: "/images/tours/jeep-safari.png" }],
    itinerary: [
      { day: 1, title: "Vattaparai View Point", description: "Visiting Vattaparai View Point" },
      { day: 1, title: "Off Road Jeep Safari", description: "Visiting Off Road Jeep Safari" },
      { day: 1, title: "Pepper Falls", description: "Visiting Pepper Falls" },
      { day: 1, title: "Sliding Fall", description: "Visiting Sliding Fall" },
      { day: 1, title: "Mehandi Circle view point", description: "Visiting Mehandi Circle view point" },
      { day: 1, title: "Palani City view", description: "Visiting Palani City view" },
      { day: 1, title: "Kodaikanal Lake or City Drop", description: "Visiting Kodaikanal Lake or City Drop" }
    ]
  }
];
