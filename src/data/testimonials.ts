export interface Testimonial {
  quote: string;
  /** Rendered as its own paragraph after the quote, as on the original site. */
  pullQuote?: string;
  name: string;
  location?: string;
  rating?: number;
}

export const shortTestimonials: Testimonial[] = [
  {
    quote:
      "JJ totally rocks a party… he keeps guests movin and groovin. If you hire JJ, you won't go wrong.",
    name: "Petar Cale",
    location: "Gilbert, AZ",
    rating: 5,
  },
  {
    quote:
      "If you wanna throw a REAL party, these guys are it… they really know how to throw a great party!!!",
    name: "Aleksiy Synkevych",
    location: "Phoenix, AZ",
    rating: 5,
  },
  {
    quote:
      "JJ was an awesome DJ! We hosted a work Casino night and he really captured the crowd… he got people dancing. If I could, I would give 12/10 stars! AWESOME DJ",
    name: "Jenni Jordan",
    location: "Arrowhead BMW",
    rating: 5,
  },
];

export const longTestimonials: Testimonial[] = [
  {
    quote:
      "JJ is an awesome DJ if you want to have a great time. Wedding receptions are so much more fun when you have a good DJ that knows how to move the crowd. JJ is really knows music. He's professional and does a great job. Highly recommended!!",
    pullQuote: "Highly recommend him for any event you want to have fun!!",
    name: "Teri Foss",
    rating: 5,
  },
  {
    quote:
      "My wife and I hired JJ to DJ our daughter's wedding reception. Wow! He's next level. Not only did he play all of my daughter's requested music, but he really knows how to read the crowd and play the right song, at the right time. Also used his emcee skills to help coordinate the schedule and keep things going.",
    pullQuote: "Highly recommend him for any event you want to have fun!!",
    name: "Gene Thomas",
    rating: 5,
  },
  {
    quote:
      "JJ totally rocks at a party! From soul, funk, disco, and hop-hop all the way to Zeppelin… how knows how to play the right music to keep guests movin' and grooving. If you hire JJ, you won't go wrong.",
    pullQuote: "Highly recommend him for any event you want to have fun!!",
    name: "Petar Cale",
    rating: 5,
  },
];
