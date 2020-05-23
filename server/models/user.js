const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const validator = require('validator')
const mongoosePaginate = require('mongoose-paginate-v2')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const Schema = mongoose.Schema

const UserSchema = Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: 'Please enter a valid email'
      },
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      select: true
    },
    image: {
      type: String
    },
    status: {
      type: Number,
      default: 1 // 1 : Active , 0 : Inactive
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

const hash = (user, salt, next) => {
  bcrypt.hash(user.password, salt, null, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash
    return next()
  })
}

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}

UserSchema.pre('save', function(next) {
  const that = this
  const SALT_FACTOR = 5
  if (!that.isModified('password')) {
    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function(passwordAttempt, cb) {
  if (!this.password) {
    cb({ code: 409, message: 'Invalid password!' })
  }
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}

UserSchema.plugin(mongoosePaginate)
UserSchema.plugin(aggregatePaginate)
module.exports = mongoose.model('User', UserSchema)
