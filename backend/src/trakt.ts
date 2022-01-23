const Trakt = require("trakt.tv");

let options = {
	client_id: process.env.TRAKT_CLIENT_ID,
	client_secret: process.env.TRAKT_CLIENT_SECRET,
	redirect_uri: process.env.TRAKT_REDIRECT_URI, // defaults to 'urn:ietf:wg:oauth:2.0:oob'
	api_url: null, // defaults to 'https://api.trakt.tv'
	useragent: null, // defaults to 'trakt.tv/<version>'
	pagination: true, // defaults to false, global pagination (see below)
	plugins: {
		// load plugins
		images: require("trakt.tv-images"),
	},
	options: {  // pass options to plugins
        images: {
			fanartApiKey: 'eee124a844b2e6598d36ce9ade9c483f',
			tmdbApiKey: '952740bdbda47b59fafde61765f7c199',
			tvdbApiKey: process.env.TVDB_API_KEY,
            smallerImages: true,
        }
    }
};

export default new Trakt(options);
