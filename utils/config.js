/**
 * It is similar to having an env file
 */
require('dotenv').config()
module.exports = {
  mongoUrl: process.env.MONGO_URL,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  assetUrl: process.env.ASSET_URL || 'http://localhost:3000'
}
