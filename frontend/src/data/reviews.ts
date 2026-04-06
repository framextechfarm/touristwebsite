export interface Review {
  id: number;
  userName: string;
  userRole: string;
  rating: number;
  comment: string;
  userImage: string;
}

export const staticReviews: Review[] = [
  {
    id: 1,
    userName: "Alice Johnson",
    userRole: "Solo Explorer",
    rating: 5,
    comment: "Kodaikanal was a dream! The trekking packages were so well-organized. Highly recommend the sunrise hike with SMR holidays.",
    userImage: ""
  },
  {
    id: 2,
    userName: "Mark Thompson",
    userRole: "Verified Traveler",
    rating: 4,
    comment: "The stay was excellent. The cottage had a breathtaking view of the valley. Great service from the SMR holidays team.",
    userImage: ""
  },
  {
    id: 3,
    userName: "Sarah Williams",
    userRole: "Nature Lover",
    rating: 5,
    comment: "I've been on many mountain trips, but this was special. The attention to detail in the itinerary from SMR holidays was impressive.",
    userImage: ""
  },
];
