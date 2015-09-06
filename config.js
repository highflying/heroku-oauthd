var config = {
	host_url: "https://luna-oauthd.herokuapp.com",		// mounted on this url
	base: "/",								// add a base url path. e.g: "/auth"
	base_api: "/api",						// api base path
	port: process.env.PORT || 80,
	//bind: "127.0.0.1",					// bind to an ip

	debug: true,							// add stack trace & infos in errors


	staticsalt: 'i m a random string, change me.',
	publicsalt: 'i m another random string, change me.',

	// see https://github.com/pmstss/heroku-oauthd/blob/master/README.md to fill this block
	redis: {
		port: 9019,	// YOUR_REDIS_PORT
		host: 'YOUR_REDIS_HOST',
		password: 'YOUR_REDIS_PASSWORD'
		// database: ...0~15...
		// options: {...other options...}
	},

	plugins: [

	]
};

if (process.env.REDIS_URL) {
  var redis_conf = process.env.REDIS_URL.match(/redis:\/\/(.+):(.+)@(.+):(.+)\//);
  config.redis = {
    port:     redis_conf[4],
    host:     redis_conf[3],
    password: redis_conf[2],
    database: redis_conf[1],
  };
}

try {
	if (__dirname != process.cwd()) {
		var instance_config = require(process.cwd() + '/config.js');
		for (var k in instance_config) {
			config[k] = instance_config[k];
		}
	}
} catch (e) {
	console.log(e);
	console.log('No config file found, using defaults');
}

try {
	if (__dirname != process.cwd()) {
		var instance_config = require(process.cwd() + '/config.local.js');
		for (var k in instance_config) {
			config[k] = instance_config[k];
		}
	}
} catch (e) {
}

console.log('using config: %s', JSON.stringify(config));

module.exports = config;
