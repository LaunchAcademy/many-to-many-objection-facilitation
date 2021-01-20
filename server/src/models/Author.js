const Model = require("./Model")

class Author extends Model {
  static get tableName(){
    return "authors"
  }

  static get relationMappings(){
    const { Book, Authorship } = require("./index.js")

    return {
      authorships: {
        relation: Model.HasManyRelation,
        modelClass: Authorship,
        join: {
          from: "authors.id",
          to: "authorships.authorId"
        }
      },
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: "authors.id",
          through: {
            from: "authorships.authorId",
            to: "authorships.bookId"
          },
          to: "books.id"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string"}
      }
    }
  }
}

module.exports = Author