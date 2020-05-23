import express from 'express';
import AuthRoutes from './auth';
import RequireAuth from '../middlewares/RequireAuth';

const router = express.Router();

const authRouter = new AuthRoutes(RequireAuth);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/v1/profile',RequireAuth, function(req, res, next) {
  res.send(req.user);
});

router.use('/api/v1', authRouter.routes());

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  return res.status(404).json({
    message: 'not found'
  });
});

export default router;
