const TODO = "TODO";

export const site = {
  name: "The Bean Journal Boutique Café",
  shortName: "The Bean Journal",
  cuisine: "European and Pan Asian",

  address: {
    line1: "50, Lamb Rd, Latasil, Uzan Bazar",
    neighbourhood: "Uzan Bazar",
    city: "Guwahati",
    state: "Assam",
    pin: "781001",
    get full() {
      return `${this.line1}, ${this.city}, ${this.state} ${this.pin}`;
    },
  },

  phone: {
    display: "98640 23095",
    tel: "+919864023095",
  },

  whatsapp: TODO,

  rating: {
    value: 4.2,
    count: 1982,
    source: "Google",
  },

  hours: TODO,
  hoursNote: TODO,
  timezone: "Asia/Kolkata",

  order: {
    zomato: "https://www.zomato.com/guwahati/the-bean-journal-2-uzan-bazaar/order",
    swiggy: "https://www.swiggy.com/city/guwahati/the-bean-journal-uzan-bazar-uzan-bazaar-rest67092",
    note: "Full menu on Zomato and Swiggy",
  },

  reservation: {
    endpoint: TODO,
    minGuests: 1,
    maxGuests: 20,
    confirmationNote: "We will confirm your booking by call or WhatsApp.",
    successMessage:
      "Thank you. Your table request has been sent. We will confirm your booking by call or WhatsApp.",
    errorMessage:
      "We could not send your request just now. Please call us to reserve your table.",
    fallbackNote:
      "Online reservations are not live yet. Send your details on WhatsApp and we will confirm.",
    whatsappLabel: "Send details on WhatsApp",
    submitLabel: "Request a table",
    submittingLabel: "Sending request…",
  },

  social: [
    { label: "Instagram", url: "https://www.instagram.com/thebeanjournal/", icon: "instagram" },
    { label: "Facebook", url: "https://www.facebook.com/thebeanjournal/", icon: "facebook" },
  ],

  fssai: "12345678901234",

  credit: {
    label: "Website by",
    name: "The Bean Journal",
    url: "https://www.thebeanjournal.com/",
  },

  hero: {
    headline: "The Bean Journal",
    line: "European and Pan Asian plates in Uzan Bazar, Guwahati.",
    image: {
      src: "/images/cafe-interior-1.webp",
      width: 1360,
      height: 780,
      alt: "Warm café interior with wooden ceiling beams, pendant lights and timber tables",
    },
  },

  assameseGreeting: TODO,

  about: {
    eyebrow: "Boutique café",
    heading: "Our story",
    ownerName: TODO,
    tagline:
      "European and Pan Asian cuisine, served in a warm corner of Guwahati.",
    story: TODO,
    image: {
      src: "/images/cafe-interior-2.webp",
      width: 1354,
      height: 1020,
      alt: "The Bean Journal counter with a chalkboard wall sign, bar stools and hanging bulbs",
    },
  },

  menu: {
    heading: "Menu highlights",
    intro:
      "A small look at the plates and drinks coming out of our kitchen. Availability may vary.",
    emptyNote: "Our menu changes often. Call us for today's dishes and prices.",
    categories: [
      {
        id: "european",
        label: "European",
        items: [
          {
            id: "european-1",
            name: TODO,
            description: TODO,
            price: TODO,
            diet: TODO,
            image: {
              src: "/images/dish-1.webp",
              width: 1002,
              height: 1020,
              alt: "Plated chicken with herbed rice, lime and salad on a black plate",
            },
          },
          {
            id: "european-2",
            name: TODO,
            description: TODO,
            price: TODO,
            diet: TODO,
            image: {
              src: "/images/dish-2.webp",
              width: 1360,
              height: 1020,
              alt: "Baked cheese pasta with garlic bread in a white oval dish",
            },
          },
          {
            id: "european-3",
            name: TODO,
            description: TODO,
            price: TODO,
            diet: TODO,
            image: {
              src: "/images/dish-5.webp",
              width: 765,
              height: 1020,
              alt: "Curry served with rice and garlic bread on a white plate",
            },
          },
        ],
      },
      {
        id: "pan-asian",
        label: "Pan Asian",
        items: [
          {
            id: "pan-asian-1",
            name: TODO,
            description: TODO,
            price: TODO,
            diet: TODO,
            image: {
              src: "/images/dish-3.webp",
              width: 1360,
              height: 765,
              alt: "Noodles topped with a fried egg in a white bowl",
            },
          },
          {
            id: "pan-asian-2",
            name: TODO,
            description: TODO,
            price: TODO,
            diet: TODO,
            image: {
              src: "/images/dish-4.webp",
              width: 1152,
              height: 864,
              alt: "Grilled chicken skewers with fries, dipping sauce and a cappuccino",
            },
          },
          {
            id: "pan-asian-3",
            name: TODO,
            description: TODO,
            price: TODO,
            diet: TODO,
            image: {
              src: "/images/dish-7.webp",
              width: 765,
              height: 1020,
              alt: "Rice noodle salad with peanuts, herbs and vegetables, served outdoors",
            },
          },
        ],
      },
    ],
  },

  gallery: {
    heading: "A look inside",
    images: [
      {
        src: "/images/cafe-interior-1.webp",
        width: 1360,
        height: 780,
        alt: "Warm café interior with wooden ceiling beams, pendant lights and timber tables",
      },
      {
        src: "/images/cafe-interior-2.webp",
        width: 1354,
        height: 1020,
        alt: "The Bean Journal counter with a chalkboard wall sign, bar stools and hanging bulbs",
      },
      {
        src: "/images/dish-1.webp",
        width: 1002,
        height: 1020,
        alt: "Plated chicken with herbed rice, lime and salad on a black plate",
      },
      {
        src: "/images/dish-2.webp",
        width: 1360,
        height: 1020,
        alt: "Baked cheese pasta with garlic bread in a white oval dish",
      },
      {
        src: "/images/dish-3.webp",
        width: 1360,
        height: 765,
        alt: "Noodles topped with a fried egg in a white bowl",
      },
      {
        src: "/images/dish-4.webp",
        width: 1152,
        height: 864,
        alt: "Grilled chicken skewers with fries, dipping sauce and a cappuccino",
      },
      {
        src: "/images/dish-6.webp",
        width: 765,
        height: 1020,
        alt: "Iced coffee layered with milk in a tall glass",
      },
      {
        src: "/images/dish-7.webp",
        width: 765,
        height: 1020,
        alt: "Rice noodle salad with peanuts, herbs and vegetables, served outdoors",
      },
    ],
  },

  reviews: {
    heading: "Kind words",
    intro: "A few notes from guests who have visited us in Guwahati.",
    items: [
      { quote: TODO, author: TODO, rating: TODO, when: TODO },
      { quote: TODO, author: TODO, rating: TODO, when: TODO },
      { quote: TODO, author: TODO, rating: TODO, when: TODO },
    ],
    googleLabel: "Read all reviews on Google",
  },

  seo: {
    title:
      "The Bean Journal Boutique Café | European & Pan Asian, Guwahati",
    description:
      "European and Pan Asian café at 50, Lamb Rd, Latasil, Uzan Bazar, Guwahati. Order online, reserve a table, or call 98640 23095.",
    url: TODO,
    ogImage: "/images/cafe-interior-1.webp",
  },
};

const mapsQuery = encodeURIComponent(
  `${site.name}, ${site.address.line1}, ${site.address.city}, ${site.address.state} ${site.address.pin}`,
);

export const maps = {
  embed: `https://www.google.com/maps?q=${mapsQuery}&output=embed`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  search: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  hasMap: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
};
