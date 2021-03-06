let books = [
  {
    ISBN: "12345Book",
    title: "Getting started with MERN",
    pubDate: "2021-07-07",
    language: "en",
    numPage: 250,
    author: [1,2],
    publication: [1],
    category: ["tech", "programming", "education", "thriller"],
  },
  {
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["fiction", "programming", "tech", "web dev"],
    publication: 1,
  },
  {
    ISBN: "12345Two",
    title: "Getting started with Python",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["fiction", "tech", "web dev"],
    publication: 1,
  },
];

let authors = [
  {
    id: 1,
    name: "pavan",
    books: ["12345ONE", "12345Two"],
  },
  {
    id: 2,
    name: "Deepak",
    books: ["12345ONE"],
  },
  {
    id: 3,
    name: "Aashita",
    books: ["12345Book"],
  },
];

let publications = [
  {
    id: 1,
    name: "Chakra",
    books: ["12345ONE"],
  },
  {
    id: 2,
    name: "Vickie Publications",
    books: [],
  },
];

module.exports = { books, authors, publications };

// HTTP client -> helper
 