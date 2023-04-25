const Model = require("./Model")

class Authorship extends Model {
  static get tableName(){
    return "authorships"
  }

   static get relationMappings(){
    const { Book, Author } = require("./index.js")

    return {
      book: {
        modelClass: Book,
        join: {
          to: "books.id",
          from: "authorships.bookId"
        },
        relation: Model.BelongsToOneRelation
      },
      author: {
        modelClass: Author, 
        relation: Model.BelongsToOneRelation,
        join: {
          from: "authorships.authorId",
          to: "authors.id"
        }
      }
    }
  }
}

module.exports = Authorship