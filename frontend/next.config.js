/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
        domains: ['thetvdb.com', 'place-hold.it', 'www.themoviedb.org'],
    }, env: {
        FANART_KEY: 'eee124a844b2e6598d36ce9ade9c483f',
        TMDB_KEY: '952740bdbda47b59fafde61765f7c199'
    }
};