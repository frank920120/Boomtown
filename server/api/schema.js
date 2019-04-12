const { gql } = require('apollo-server-express');

/**
 *  @TODO: Boomtown Schema
 *
 * Define the types in your GraphQL schema here.
 * For each type, remove the `_: Boolean` placeholder and add the
 * fields as directed. Be sure to finish writing resolvers for all types
 * and any relational fields, where required.
 *
 * We will create the custom Date scalar together.
 */
module.exports = gql`

  scalar Date

  type Item {
    _: Boolean
  }

  type User {
    _: Boolean
  }

  type Tag {
    _: Boolean
  }

  type File {
    _: Boolean
  }

  input AssignedTag {
    _: Boolean
  }

  input AssignedBorrower {
    _: Boolean
  }

  input NewItemInput {
    _: Boolean
  }

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  type Mutation {
    addItem: Boolean
  }
`;
