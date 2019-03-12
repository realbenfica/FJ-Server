import { makeExecutableSchema, GraphQLObjectType, GraphQLSchema,} from 'graphql-tools';

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://tuqvrnyuewgtch:155699c54ff6dd27fdbdd24994c3c3f0fcc229fe28cb0da10cc69fde357edcb4@ec2-54-75-232-114.eu-west-1.compute.amazonaws.com:5432/d1rvf7fvtepa86?sslmode=require', { dialectOptions: { ssl: true }})

const typeDefs = `
  type VideoPerformanceReport {
    _sdc_primary_key: String
    _sdc_batched_at: String
    _sdc_customer_id: String
    _sdc_extracted_at: String
    _sdc_received_at: String
    _sdc_report_datetime: String
    _sdc_sequence: String
    _sdc_table_version: String 
    account: String 
    adGroup: String
    adGroupID: String
    adGroupState: String
    adID: String
    adState: String
    allConv: String
    allConvRate: String
    allConvValue: String
    avgCPM: String
    avgCPV: String
    campaign: String
    campaignID: String
    campaignState: String
    clicks: Int
    clientName: String
    convRate: String
    conversions: String
    cost: Int
    costAllConv: String 
    costConv: String
    ctr: String
    currency: String
    customerID: String
    day: String
    dayOfWeek: String 
    device: String
    engagementRate: String 
    engagements: String
    impressions: String
    month: String
    monthOfYear: String 
    network: String
    networkWithSearchPartners: String
    quarter: String
    timeZone: String
    totalConvValue: String
    valueAllConv: String
    videoChannelId: String
    videoDuration: String
    videoId: String
    videoPlayedTo100: String 
    videoPlayedTo25: String
    videoPlayedTo50: String
    videoPlayedTo75: String
    videoTitle: String
    viewRate: Float
    viewThroughConv: String 
    views: Float
    week: String 
    year: String
    impressions_sum: Int
    views_sum: Int
    ctr_avg: Float
    viewRate_avg: Float    
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
  campaign : String
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
  impressions: Int
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
  viewRate: Int
  views: Int
  week: String
  sum: Int
}

input VideoQuery {
  videoId: String
}

 
type Query {
    getOneVideoKpis(where: VideoQuery): VideoPerformanceReport!
    getAllVideos: [VideoPerformanceReport!]
    getVideoKpisbyCampaign: [VideoPerformanceReport]
    getVideoKpis:  [VideoPerformanceReport]
    getViewsPerDay(where: VideoQuery): [VideoPerformanceReport!]
  }
`;

const resolvers = {

  Query: {
    getAllVideos: async () => {
      return sequelize
        .query('SELECT * from "google_ads"."VIDEO_PERFORMANCE_REPORT"', { type: sequelize.QueryTypes.SELECT })
        .then(result => {
          return result
        })
    },

    getVideoKpis: async () => {
      return sequelize
        .query('SELECT "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoTitle" AS "videoTitle", "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoId" AS "videoId", "google_ads"."VIDEO_PERFORMANCE_REPORT"."campaign" AS "campaign", sum("google_ads"."VIDEO_PERFORMANCE_REPORT"."impressions") AS "impressions_sum", sum("google_ads"."VIDEO_PERFORMANCE_REPORT"."views") AS "views_sum", avg("google_ads"."VIDEO_PERFORMANCE_REPORT"."viewRate") AS "viewRate_avg" FROM "google_ads"."VIDEO_PERFORMANCE_REPORT" GROUP BY "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoTitle", "google_ads"."VIDEO_PERFORMANCE_REPORT"."campaign", "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoId" ORDER BY "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoTitle" ASC, "google_ads"."VIDEO_PERFORMANCE_REPORT"."campaign" ASC', { type: sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result)
          return result
        })
    },

    getOneVideoKpis: async (_, params) => {
      return sequelize
        .query(`SELECT "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoTitle" AS "videoTitle", 
        "google_ads"."VIDEO_PERFORMANCE_REPORT"."campaign" AS "campaign", 
        "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoId" AS "videoId", 
        "google_ads"."VIDEO_PERFORMANCE_REPORT"."campaignID" AS "campaignID",
        sum("google_ads"."VIDEO_PERFORMANCE_REPORT"."impressions") AS "impressions_sum", 
        sum("google_ads"."VIDEO_PERFORMANCE_REPORT"."views") AS "views_sum", 
        avg("google_ads"."VIDEO_PERFORMANCE_REPORT"."viewRate") AS "viewRate_avg", 
        avg("google_ads"."VIDEO_PERFORMANCE_REPORT"."ctr") AS "ctr_avg"
        FROM "google_ads"."VIDEO_PERFORMANCE_REPORT"
        WHERE "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoId" = '${params.where.videoId}'
        GROUP BY "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoTitle", "google_ads"."VIDEO_PERFORMANCE_REPORT"."campaign", "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoId", "google_ads"."VIDEO_PERFORMANCE_REPORT"."campaignID"
        ORDER BY "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoTitle" ASC, "google_ads"."VIDEO_PERFORMANCE_REPORT"."campaign" ASC, "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoId" ASC`, { type: sequelize.QueryTypes.SELECT })
        .then(result => {
          return result
        })
    },

    getViewsPerDay: async (_, params) => {
      return sequelize
        .query(`SELECT CAST("google_ads"."VIDEO_PERFORMANCE_REPORT"."day" AS date) AS "day", sum("google_ads"."VIDEO_PERFORMANCE_REPORT"."views") AS "views_sum"
        FROM "google_ads"."VIDEO_PERFORMANCE_REPORT"
        WHERE "google_ads"."VIDEO_PERFORMANCE_REPORT"."videoId" = '${params.where.videoId}'
        GROUP BY CAST("google_ads"."VIDEO_PERFORMANCE_REPORT"."day" AS date)
        ORDER BY CAST("google_ads"."VIDEO_PERFORMANCE_REPORT"."day" AS date) ASC`, 
        { type: sequelize.QueryTypes.SELECT })
        .then(result => {
          console.log(result, '<================')
          return result
        })
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;