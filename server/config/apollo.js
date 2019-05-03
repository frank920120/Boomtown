const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const jwt = require('jsonwebtoken');
const typeDefs = require('../api/schema');
const { AuthDirective } = require('../api/custom-directives');
let resolvers = require('../api/resolvers');

module.exports = ({ app, pgResource }) => {
  resolvers = resolvers(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDirective
    }
  });

  const apolloServer = new ApolloServer({
    context: ({ req }) => {
      console.log(req.cookies);

      const tokenName = app.get('JWT_COOKIE_NAME');
      const encodedToken = req ? req.cookies[tokenName] : undefined;
      const token = encodedToken
        ? jwt.decode(encodedToken, app.get('JWT_SECRET'))
        : undefined;

      return {
        req,
        token,
        pgResource
      };
    },
    schema
  });

  apolloServer.applyMiddleware({
    app,

    cors: app.get('CORS_CONFIG')
  });
};
