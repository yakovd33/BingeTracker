import { Router } from 'express';
import { getAllUsers } from './Users';
import trakt from '../trakt';
import { getPopularShows } from './Shows';

// User Route
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.get('/get_trakt_auth_url', (req, res, next) => {
    const traktAuthUrl = trakt.get_url();
    console.log(traktAuthUrl);
    res.status(200).json({ url: traktAuthUrl })
})

// Shows Route
const showsRouter = Router();
showsRouter.get('/', getPopularShows);


// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/shows', showsRouter);
export default baseRouter;