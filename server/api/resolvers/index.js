/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control th error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
const authMutations = require('./auth');
// -------------------------------
const { DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    // Date: DateScalar,

    Query: {
      viewer() {
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);

          if (user == null) {
            throw 'user was not found!';
          }
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource, token }, info) {
        try {
          const item = await pgResource.getItems(filter);
          return item;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(parent, args, { pgResource }, info) {
        try {
          const tag = await pgResource.getTags();

          return tag;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    User: {
      async items({ id }, args, { pgResource }) {
        try {
          const userItem = await pgResource.getItemsForUser(id);
          return userItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrowed({ id }, args, { pgResource }) {
        try {
          const borrowitem = await pgResource.getBorrowedItemsForUser(id);
          return borrowitem;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Item: {
      async itemowner({ itemowner }, args, { pgResource }) {
        try {
          const userLent = await pgResource.getUserById(itemowner);

          return userLent;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags({ id }, args, { pgResource }) {
        try {
          const itemtags = await pgResource.getTagsForItem(id);
          return itemtags;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async borrower({ borrower }, args, { pgResource }) {
        try {
          if (!borrower) {
            return null;
          }
          const userBorrow = await pgResource.getUserById(borrower);

          return userBorrow;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Mutation: {
      ...authMutations(app),

      async addItem(parent, args, context, info) {
        const user = context.token.id;
        try {
          const addItemTags = await context.pgResource.saveNewItem({
            item: args.item,
            user
          });
          return addItemTags;
        } catch (e) {
          throw new ApolloError(e);
        }

        // image = await image;
        // const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
        // const newItem = await context.pgResource.saveNewItem({
        //   item: args.item,
        //   image: args.image,
        //   user
        // });
        // return newItem;
      }
    }
  };
};
