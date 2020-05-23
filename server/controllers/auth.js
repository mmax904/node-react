import jwt from 'jsonwebtoken';
import passport from 'passport';
import City from '../models/city'

const Auth = {
    /**
     * 
     * @param {object} req 
     * @param {object} res
     * @returns {object} user object 
     */
    login: (req, res) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user   : user
                });
            }
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign({id:user._id}, process.env.PASSPORT_SECRET);
                return res.json({user, token});
            });
        })
        (req, res);
    },

    logout: (req, res) => {
        req.logout();
        return res.status(200).json({
            message: 'Logged Out!!',
            data: {}
        });
    },

    cityList: (req, res) => {
        const options = req.query;
        options.page = options.page || 1;
        options.limit = options.limit || 10;
        City.paginate(null, options, (err, items) => {
            if(err) {
                return res.status(400).json({
                    message: 'Something went wrong.',
                    data: []
                });
            }
            return res.status(200).json({
                message: 'Fetched!!',
                data: items.docs
            });
        })
    }
}

export default Auth;
