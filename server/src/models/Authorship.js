const Model = require("./Model");

class Authorship extends Model {
  static get tableName() {
    return "authorships";
  }

  static get relationMappings() {
    // const Author = require("./Author");
    // const Book = require("./Book");
    const { Author, Book } = require("./index");

    // an authorship belongs to one author
    return {
      author: {
        modelClass: Author,
        relation: Model.BelongsToOneRelation,
        join: {
          from: "authorships.authorId",
          to: "authors.id",
        },
      },
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: "authorships.bookId",
          to: "books.id",
        },
      },
    };
  }
}

module.exports = Authorship;
