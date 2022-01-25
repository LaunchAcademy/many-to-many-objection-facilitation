/* eslint-disable no-console */
import { connection } from "../boot.js";

import { Book, Author, Authorship } from "../models/index.js";

class Seeder {
  static async seed() {
    // Create individual Books
    const martian = await Book.query().insertAndFetch({ name: "The Martian" });
    const kingdoms = await Book.query().insertAndFetch({ name: "The Hundred Thousand Kingdoms" });
    const fifthSeason = await Book.query().insertAndFetch({ name: "The Fifth Season" });
    const rails = await Book.query().insertAndFetch({ name: "The Rails 4 Way" });

    // // Create individual Author
    const author1 = await Author.query.insertAndFetch({ name: "Andy Weir"})
    // // Create association between Book and Author (with id's)
    const authorship1 = await Authorship.query().insertAndFetch({ authorId: author1.id, bookId: martian.id })




    // Create Author AND associate with book! (using associations defined in relationMappings)
    await martian.$relatedQuery("authors").insert({ name: "Andy Weir" });

    await kingdoms.$relatedQuery("authors").insert({ name: "N.K. Jemisin" });
    await rails.$relatedQuery("authors").insert({ name: "Obie Fernandez" });
    await rails.$relatedQuery("authors").insert({ name: "Kevin Faustino" });

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
