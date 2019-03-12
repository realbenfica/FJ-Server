import { makeExecutableSchema } from 'graphql-tools';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://foygkrhpcdzrxb:f3542be543fc5d8f9ed55d8fb95c7fba328a09ef87adfb16fd7ec751648e82d9@ec2-54-247-70-127.eu-west-1.compute.amazonaws.com:5432/dedsrpcv2co3k0', { dialectOptions: { ssl: true } })

const typeDefs = `

type Campaign {
  detail: CampaignDetail!
  name: String!
  id: String!
  platform: String!
}

type CampaignDetail {
  unique_views: String!
  ctr: Int!
  cpv: Int!
  retention: Int
}

type SocialCampaigns {
  facebook: [Campaign!]
  google: [Campaign!]
}

input VideoQuery {
  videoId: String
}
 
type Query {
    getCampaigns:SocialCampaigns!
  }
`;

const resolvers = {
    Query: {
        getCampaigns: async () => {
            const facebook = await sequelize.query(`SELECT * from "campaigns" WHERE platform='FACEBOOK'`, { type: sequelize.QueryTypes.SELECT })
            const google = await sequelize.query(`SELECT * from "campaigns" WHERE platform='GOOGLE'`, { type: sequelize.QueryTypes.SELECT })
            console.log(google)
            return {
                google,
                facebook
            }
        },
    },
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;