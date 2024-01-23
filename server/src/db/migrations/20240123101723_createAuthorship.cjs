/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("authorships", (table) => {
    table.bigIncrements("id");

    table.bigInteger("bookId").notNullable().unsigned().index().references("books.id");
    table.bigInteger("authorId").notNullable().unsigned().index().references("authors.id");

    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists("authorships");
};
