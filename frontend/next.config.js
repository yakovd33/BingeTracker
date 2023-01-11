/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
        domains: ['thetvdb.com', 'place-hold.it', 'www.themoviedb.org', 'image.tmdb.org'],
    }, env: {
        FANART_KEY: process.env.FANART_KEY,
        TMDB_KEY: process.env.TMDB_KEY,
        API_URL: process.env.API_URL
    }
};