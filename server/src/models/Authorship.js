const Model = require("./Model")

class Authorship extends Model {
  static get tableName(){
    return "authorships"
  }

   static get relationMappings(){
    const { Book, Author } = require("./index.js")

    return {
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: "authorships.bookId",
          to: "books.id"
        }
      },
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: Author,
        join: {
          from: "authorships.authorId",
          to: "authors.id"
        }
      }
    }
  }
}

module.exports = Authorship