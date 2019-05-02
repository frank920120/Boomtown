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
      viewer(parent, args, context, info) {
        if (context.token) {
          return context.token;
        }

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
