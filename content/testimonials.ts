export type Testimonial = { quote: string; who: string };

/** Verbatim from public guest reviews. Do not edit the wording. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Nice clean rooms and washrooms, a huge green property with dancing peacocks, lots of birds, a clean pool and fresh, tasty breakfast.",
    who: "Jaipur · travelled with family",
  },
  {
    quote: "Truly amazing. The best part is its privacy and freedom.",
    who: "Jaipur · travelled with friends",
  },
  {
    quote:
      "My third visit to this resort and every time the experience is the best. The staff are so cooperative.",
    who: "Returning guest · November",
  },
];

export const pullQuotes = {
  gardens: {
    quote: "A huge green property with dancing peacocks and lots of birds.",
    cite: "Guest review · August 2019",
  },
  rooms: {
    quote: "All rooms face garden and pool.",
    cite: "Guest review · insider tip",
  },
  bonfire: {
    quote: "Bonfire was awesome in winters.",
    cite: "Guest review · February",
  },
};
