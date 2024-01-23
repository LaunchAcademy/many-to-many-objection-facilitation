const Model = require("./Model");

class Author extends Model {
  static get tableName() {
    return "authors";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    // const Authorship = require("./Authorship");
    const { Authorship, Book } = require("./index");

    // an author has many authorships
    // an author has many books (through those authorships)
    return {
      authorships: {
        relation: Model.HasManyRelation,
        modelClass: Authorship,
        join: {
          from: "authors.id",
          to: "authorships.authorId",
        },
      },
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: "authors.id",
          through: {
            from: "authorships.authorId",
            to: "authorships.bookId",
          },
          to: "books.id",
        },
      },
    };
  }
}

module.exports = Author;
