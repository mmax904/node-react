import express from 'express';
import { login, cities } from '../validations/auth';
import AuthController from '../controllers/auth';

class AuthRoutes {
    
    constructor(requireAuth){
        this.router = express.Router();
        this.requireAuth = requireAuth;
    }

    routes() {
        this.router.post('/login', login, AuthController.login);
        this.router.get('/logout', AuthController.logout);
        this.router.get('/cities', this.requireAuth, cities, AuthController.cityList);
        return this.router
    }
}

export default AuthRoutes;