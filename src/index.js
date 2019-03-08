import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import schema from './schema/example';

const app = new koa();
const router = new koaRouter();
const PORT = process.env.PORT || 3000;

console.clear();
console.log(
  '  Welcome!\n',
  '  ---------------------------------------\n');

// Setup the graphql server routes with the Schema
router.post('/graphql', koaBody(), graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));

// Setup the /graphiql route to show the GraphiQL UI
router.get('/graphiql', graphiqlKoa({
  endpointURL: '/graphql',
  
  // passHeader: `'Authorization': 'Bearer <test token>'`,
}));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  // console.log(`   GraphQL server started on:\n   ${url}\n\n`,
  //   `➜ Open ${url}/graphiql to\n   start querying your API.\n\n`,
  //   `➜ Point your GraphQL client apps to\n   ${url}/graphql\n`,
  // ' ---------------------------------------\n');
});

import ApolloClient from "apollo-boost";

const client = new ApolloClient

// https://fj-servers.herokuapp.com/graphiql

// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('postgres://tuqvrnyuewgtch:155699c54ff6dd27fdbdd24994c3c3f0fcc229fe28cb0da10cc69fde357edcb4@ec2-54-75-232-114.eu-west-1.compute.amazonaws.com:5432/d1rvf7fvtepa86?sslmode=require', {dialectOptions: {ssl: true}})
//  sequelize
//     .query('SELECT account_name FROM test2.ads_insights')
//     .then(result => console.log(result))
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
// const AdInsights = sequelize.define('ads_insights', {
//   add_id: Sequelize.STRING,
//   account_name: Sequelize.STRING
// })

// AdInsights.find().then((result) => {
//   console.log(result)
// })


// const getData = async () => {
//   // Or you can simply use a connection uri
//   const sequelize = await new Sequelize('postgres://tuqvrnyuewgtch:155699c54ff6dd27fdbdd24994c3c3f0fcc229fe28cb0da10cc69fde357edcb4@ec2-54-75-232-114.eu-west-1.compute.amazonaws.com:5432/d1rvf7fvtepa86', {ssl: true});
//   sequelize.sync((data) => {
//     console.log(data)
//   }).then().catch((err) => console.log(err))
//   // sequelize
//   //   .query('SELECT * FROM test2.ads_insights')
//   //   .then(result => console.log(result))
// }

// getData()
