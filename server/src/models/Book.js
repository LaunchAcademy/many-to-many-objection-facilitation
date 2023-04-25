const Model = require("./Model")

class Book extends Model {
  static get tableName(){
    return "books"
  }

  static get relationMappings() {
    const { Author, Authorship } = require("./index.js")

    return {
      authorships: {
        relation: Model.HasManyRelation,
        modelClass: Authorship,
        join: {
          from: "books.id",
          to: "authorships.bookId"
        }
      },
      authors: {
        relation: Model.ManyToManyRelation,
        modelClass: Author,
        join: {
          from: "books.id",
          through: {
            from: "authorships.bookId",
            to: "authorships.authorId"
          },
          to: "authors.id" 
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

module.exports = Book