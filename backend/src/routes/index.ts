import { Router } from 'express';
import { getAllUsers, login, register, traktRedirect } from '../controllers/Users';
import { verifyToken } from '../middleware/Auth';
import trakt from '../trakt';
import { getEpisodeByNumber, getPopularShows, getShowById } from '../controllers/Shows';
import { getPopularMovies } from '../controllers/Movies';
import { getSearchResults } from '../controllers/Search';
import { historyWatch, historyUnWatch } from '../controllers/History';

// User Route
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/login', login);
userRouter.post('/register', register);
userRouter.get('/get_trakt_auth_url', (req, res, next) => {
    const traktAuthUrl = trakt.get_url();
    console.log(traktAuthUrl);
    res.status(200).json({ url: traktAuthUrl })
});
userRouter.get('/trakt_redirect', traktRedirect)

// Shows Route
const showsRouter = Router();
showsRouter.get('/showcase/:page', getPopularShows);
showsRouter.get('/:id', getShowById);
showsRouter.get('/:id/:season/:episode', getEpisodeByNumber);

// Movies Route
const moviesRouter = Router();
moviesRouter.get('/showcase/:page', getPopularMovies);
// moviesRouter.get('/:id', getShowById);

// Search Route
const searchRouter = Router();
searchRouter.get('/:keywords', getSearchResults);

// History Route
const historyRouter = Router();
historyRouter.post('/watch/:imdbId', verifyToken, historyWatch);
historyRouter.post('/unwatch/:imdbId', verifyToken, historyUnWatch);

// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/shows', showsRouter);
baseRouter.use('/movies', moviesRouter);
baseRouter.use('/search', searchRouter);
baseRouter.use('/history', historyRouter);
export default baseRouter;