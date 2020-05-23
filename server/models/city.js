const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const Schema = mongoose.Schema

const CitySchema = Schema(
  {
    name: {
      type: String
    },
    state: {
      type: String
    }
  },
  {
    collation: { locale: 'en_US', strength: 1 },
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
)

CitySchema.plugin(mongoosePaginate)
CitySchema.plugin(aggregatePaginate)
module.exports = mongoose.model('City', CitySchema,'cities')
