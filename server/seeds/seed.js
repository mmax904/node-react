const NodeEnviRonment = '.env.'+process.env.NODE_ENV;
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: NodeEnviRonment});

mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true });

const City = require('../models/city');
const User = require('../models/user');

const cities = JSON.parse(fs.readFileSync(__dirname + '/cities.json', 'utf-8'));
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'));
const userData = new User(users);

async function loadData() {
    try {
        await City.insertMany(cities);
        await userData.save();
        console.log('Done!');
        process.exit();
    } catch (e) {
        console.log(e);
        process.exit();
    }
}

loadData();
