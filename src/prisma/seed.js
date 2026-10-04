import { db } from "./db.js";
import 'temporal-polyfill/global';

const creatorId = "72855007-a0b5-452c-bf35-424ac6576eb8"; // Replace with your actual user ID or variable

const movies = [
  {
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genres: ["Sci-Fi", "Drama", "Adventure"],
    runtime: 169,
    createdBy: creatorId
  },
  {
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runtime: 154,
    createdBy: creatorId
  },
  {
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Adventure"],
    runtime: 148,
    createdBy: creatorId
  },
  {
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    createdBy: creatorId
  },
  {
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.",
    releaseYear: 1999,
    genres: ["Drama"],
    runtime: 139,
    createdBy: creatorId
  },
  {
    title: "Forrest Gump",
    overview: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    releaseYear: 1994,
    genres: ["Drama", "Romance"],
    runtime: 142,
    createdBy: creatorId
  },
  {
    title: "The Matrix",
    overview: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cybernetic intelligence.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    createdBy: creatorId
  },
  {
    title: "GoodFellas",
    overview: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    releaseYear: 1990,
    genres: ["Biography", "Crime", "Drama"],
    runtime: 146,
    createdBy: creatorId
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    overview: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    releaseYear: 2001,
    genres: ["Adventure", "Fantasy", "Drama"],
    runtime: 178,
    createdBy: creatorId
  },
  {
    title: "Interstellar 2",
    overview: "A fictional follow-up placeholder seed item.",
    releaseYear: 2025,
    genres: ["Sci-Fi", "Adventure"],
    runtime: 150,
    createdBy: creatorId
  }
];

async function main() {
  console.log("Seeding movies...");

  for (const movie of movies) {
    await db.orm.public.Movie.create({
      ...movie
    });
    console.log(`Created movie: ${movie.title}`);
  }

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.close();
  });