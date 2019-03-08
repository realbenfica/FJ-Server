//TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST
//TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST
//TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST

import { makeExecutableSchema } from 'graphql-tools';
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://tuqvrnyuewgtch:155699c54ff6dd27fdbdd24994c3c3f0fcc229fe28cb0da10cc69fde357edcb4@ec2-54-75-232-114.eu-west-1.compute.amazonaws.com:5432/d1rvf7fvtepa86?sslmode=require', { dialectOptions: { ssl: true } })

const filter = (data, conditions) => {
  const fields = Object.keys(conditions);
  return data.filter((obj) => {
    return fields
      .filter(k => obj[k] === conditions[k])
      .length === fields.length;
  });
};

const find = (data, conditions) => {
  return filter(data, conditions)[0];
};

// example data
const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
  { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];
const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
  { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

const typeDefs = `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    """
    the list of Posts by this author
    """
    posts: [Post]
  }

  type AdInsight {
    ad_id: String!
    campaign_name: String
    cpc: String
    account_id: String
    campaign_id: String
    clicks: String
    impressions: String
    cpm: String
    ctr: String
    cpp: String
    unique_clicks: String
    cost_per_unique_click: String
  }
  type CampaignPerformanceReport {
  _sdc_primary_key: String
  _sdc_batched_at: String
  _sdc_customer_id: String
  _sdc_extracted_at: String
  _sdc_received_at: String
  _sdc_report_datetime: String
  _sdc_sequence: String
  _sdc_table_version: String
  account: String
  activeViewAvgCPM: String
  activeViewMeasurableCost: String
  activeViewMeasurableImpr: String
  activeViewMeasurableImprImpr: String
  activeViewViewableCTR: String
  activeViewViewableImprMeasurableImpr: String
  activeViewViewableImpressions: String
  advertisingChannel: String
  allConv: String
  allConvRate: String
  allConvValue: String
  avgCPC: String
  avgCPE: String
  avgCPM: String
  avgCPV: String
  avgCost: String
  avgImprFreqPerCookie: String
  avgPosition: String
  avgSessionDurationSeconds: String
  baseCampaignID: String
  bidStrategyID: String
  bidStrategyType: String
  bounceRate: String
  budget: String
  budgetExplicitlyShared: String
  budgetID: String
  budgetPeriod: String
  campaign: String
  campaignGroupID: String
  campaignID: String
  campaignServingStatus: String
  campaignState: String
  campaignTrialType: String
  clickAssistedConv: String
  clicks: String
  clientName: String
  contentImprShare: String
  contentLostISBudget: String 
  contentLostISRank: String
  convRate: String
  convValueCurrentModel: String
  conversions: String
  conversionsCurrentModel: String
  cost: String
  costAllConv: String
  costConv: String
  costConvCurrentModel: String
  ctr: String
  currency: String
  customerID: String
  day: String
  endDate: String
  engagementRate: String
  engagements: String
  enhancedCPCEnabled: String
  gmailClicksToWebsite: String
  gmailForwards: String
  gmailSaves: String
  hasRecommendedBudget: String
  imprAssistedConv: String
  impressions: String
  interactionRate: String
  interactionTypes: String
  interactions: String
  invalidClickRate: String
  invalidClicks: String
  labelIDs: String
  month: String
  monthOfYear: String
  network: String
  networkWithSearchPartners: String
  newSessions: String
  pagesSession: String
  phoneCalls: String
  phoneImpressions: String
  ptr: String
  relativeCTR: String
  startDate: String
  targetROASMaximizeConversionValue: String
  timeZone: String
  totalConvValue: String
  uniqueCookies: String
  valueAllConv: String
  valueConv: String
  valueConvCurrentModel: String
  videoPlayedTo100: String
  videoPlayedTo25: String
  videoPlayedTo50: String
  videoPlayedTo75: String
  viewRate: String
  views: String
  week: String
}

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    posts: [Post]
    author(id: Int!): Author
    getInsights: [AdInsight!]
    getCampaignPerformanceReport: [CampaignPerformanceReport!] 
  }

  # this schema allows the following mutation:
  type Mutation {
    upvotePost (
      postId: Int!
    ): Post
  }
`;

const resolvers = {
  Query: {
    posts: () => posts,
    author: (_, { id }) => find(authors, { id: id }),
    // getInsights: async () => {

    //   return sequelize
    //     .query('SELECT * FROM test2.ads_insights', { type: sequelize.QueryTypes.SELECT })
    //     .then(result => {
    //       console.log(result[0].ad_id)
    //       return result
    //     })
    // },
    getCampaignPerformanceReport: async () => {
      return sequelize
        .query('SELECT * FROM LIKE google_ads.CAMPAIGN_PERFORMANCE_REPORT', { type: sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result)
          return result
        })
    }
  },
  Mutation: {
    upvotePost: (_, { postId }) => {
      const post = find(posts, { id: postId });
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      return post;
    },
  },
  Author: {
    posts: (author) => filter(posts, { authorId: author.id }),
  },
  Post: {
    author: (post) => find(authors, { id: post.authorId }),
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;