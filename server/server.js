const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  
  // start Apollo server
  await server.start();

  // integrate Apollo server with Express application as middleware
  server.applyMiddleware({ app });

  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
