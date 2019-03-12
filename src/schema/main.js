import { makeExecutableSchema } from 'graphql-tools';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://foygkrhpcdzrxb:f3542be543fc5d8f9ed55d8fb95c7fba328a09ef87adfb16fd7ec751648e82d9@ec2-54-247-70-127.eu-west-1.compute.amazonaws.com:5432/dedsrpcv2co3k0', { dialectOptions: { ssl: true } })

const typeDefs = `

type Query {
  getCampaigns:SocialCampaigns!
  getCampaignsDetails(id: String!): Campaign!
}
type CampaignDetail {
  unique_views: String!
  ctr: String!
  cpv: String!
  retention: String!
}
type Campaign {
  detail: CampaignDetail
  ads: [VideoAd]!
  name: String!
  id: String!
  platform: String!
}
type VideoAd {
  id: String!
  name: String!
  cpv: String!
  ctr: String!
  unique_views:Int!
  spend: String!
  retention: String!
  video_id: String!
  thumbnails: String
}
type SocialCampaigns {
  facebook: [Campaign!]
  google: [Campaign!]
}
`;

const resolvers = {
    Query: {
        getCampaigns: async () => {
            const facebook = await sequelize.query(`SELECT * from "campaigns" WHERE platform='FACEBOOK'`, { type: sequelize.QueryTypes.SELECT })
            const google = await sequelize.query(`SELECT * from "campaigns" WHERE platform='GOOGLE'`, { type: sequelize.QueryTypes.SELECT })
            return {
                google,
                facebook
            }
        },
        getCampaignsDetails: async (_, params) => {
          const campaign = await sequelize.query(`SELECT * from "campaigns" WHERE id =  '${params.id}'`, { type: sequelize.QueryTypes.SELECT })
          return campaign[0]
        }
    },

  

    Campaign: {
      detail: async (ctx) => {
        const results = await sequelize.query(`SELECT * from "campaign_details" WHERE id = '${ctx.id}'`,  { type: sequelize.QueryTypes.SELECT })
        return results[0]
      },
      ads: async (ctx) => {
        const results = await sequelize.query(`SELECT * from "video_ads" WHERE campaign_id = '${ctx.id}'`,  { type: sequelize.QueryTypes.SELECT })
        return results
      }
    },
    
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default schema;