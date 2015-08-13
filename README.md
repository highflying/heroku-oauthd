## heroku-oauthd

**heroku-oauthd** is customized preconfigured [oauthd](https://github.com/oauth-io/oauthd) instance for using at [Heroku](https://heroku.com).
It took for me almost a day to get it running and I'm glad to share expierence.

### Differences from original oauthd:
- includes necessary 'postinstall' and 'start' scripts config in package.json: 'postinstall' runs grunt, 'start' starts the app. See details [here](https://devcenter.heroku.com/articles/node-with-grunt)
- already configured: includes necessary plugins.json entries and plugins files. it's really necessary for heroku, because it's impossible to install plugins in [normal way](https://github.com/oauth-io/oauthd/wiki/Plugin-installation-and-usage) due to install.js implementation and [ephemeral-filesystem](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem). 
_Sidenote: also installing plugins doesn't work on Windows, e.g. see [line 45 of install.coffee](https://github.com/oauth-io/oauthd/blob/1.0.0-beta.17/src/scaffolding/plugins/install.coffee#L45) - it contains ';' as command separator, which is not supported in Windows; but fixing only this separator doesn't help._
- plugins includes their node_modules folder, because submodule grunt build doesn't work out-of-box (perhaps this could be easily improved later). 

### Starting your own oauthd instance at heroku:
1. **Clone the repo and go to its dir:**
```sh 
λ git clone https://github.com/pmstss/heroku-oauthd
Cloning into 'heroku-oauthd'...
remote: Counting objects: 22617, done.
remote: Compressing objects: 100% (5554/5554), done.
remote: Total 22617 (delta 1239), reused 0 (delta 0), pack-reused 16312
Receiving objects: 100% (22617/22617), 40.81 MiB | 1.49 MiB/s, done.
Resolving deltas: 100% (11363/11363), done.
Checking connectivity... done.
Checking out files: 100% (12015/12015), done.

λ cd heroku-oauthd
```
2. **Create heroku instance:**  
Note: If you don't have heroku account, start with [toolbelt](https://toolbelt.heroku.com/).
```sh 
λ heroku create heroku-oauthd-sample
Creating heroku-oauthd-sample... done, stack is cedar-14
https://heroku-oauthd-sample.herokuapp.com/ | https://git.heroku.com/heroku-oauthd-sample.git
Git remote heroku added
updating Heroku CLI...done. Updated to 3.41.3
```
Last parameter (heroku-oauthd-sample in example) is optional. If not provided, heroku will autogenerate some name like falling-wind-42 for you. See [heroku docs](https://devcenter.heroku.com/articles/git) for details.
Ensure in success by running "git remote -v":
```sh 
λ git remote -v
heroku  https://git.heroku.com/heroku-oauthd-sample.git (fetch)
heroku  https://git.heroku.com/heroku-oauthd-sample.git (push)
origin  https://github.com/pmstss/heroku-oauthd (fetch)
origin  https://github.com/pmstss/heroku-oauthd (push)
```
3. **Add Redis addon to you heroku instance:**
```sh 
λ heroku addons:create heroku-redis:hobby-dev
Creating giving-fleetingly-1820... done, (free)
Adding giving-fleetingly-1820 to heroku-oauthd-sample... done
Setting REDIS_URL and restarting heroku-oauthd-sample... done, v3
Instance has been created and will be available shortly
Use `heroku addons:docs heroku-redis` to view documentation.
```   
'hobby-dev' above is name of free of charge plan. To get another plans info visit [redis addon page](https://elements.heroku.com/addons/heroku-redis).
4. **Edit config.js: configure host**  
In step 2 'heroku-oauthd-sample' was specified as desired name, so host url is https://heroku-oauthd-sample.herokuapp.com:
```javascript 
var config = {
	host_url: "https://heroku-oauthd-sample.herokuapp.com",		// mounted on this url
	...
```
5. **Get your redis url**   
REDIS_URL is part of heroku config, you can get it by running:
```sh 
λ heroku config | grep REDIS
REDIS_URL: redis://h:p8pmadbcsou38p0hfp4z7hk2ut@ec2-54-83-205-42.compute-1.amazonaws.com:9742
```
6. **Edit config.js - configure redis parameters**  
For the given REDIS_URL redis parameters in config.js should look like ('h' - database name - is not used):
```javascript 
    ...
	redis: {
		port: 9742,
		host: 'ec2-54-83-205-42.compute-1.amazonaws.com',
		password: 'p8pmadbcsou38p0hfp4z7hk2ut'
		// database: ...0~15...
		// options: {...other options...}
	},
	...
```
7. **Commit your changes:**  
```sh
λ git commit -a -m "configuration"
[master 2960461] configuration
 1 file changed, 4 insertions(+), 4 deletions(-)
```
8. ** Deploy to heroku by pushing changes to heroku repo:**  
Beside push related messages you will see grunt build:
```sh
λ git push heroku master
Counting objects: 10570, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (6182/6182), done.
Writing objects: 100% (10570/10570), 24.80 MiB | 78.00 KiB/s, done.
Total 10570 (delta 3505), reused 10553 (delta 3498)
remote: Compressing source files... done.
remote: Building source: 
```

TODO!!!

### Copyright
#### oauthd
Copyright (C) 2015 Webshell SAS 
[https://github.com/oauth-io/oauthd](https://github.com/oauth-io/oauthd) and other contributors
#### heroku-oauthd
Copyright (C) 2015 Viachaslau Tyshkavets [pmstss](https://github.com/pmstss/)

### License

[Apache License 2.0](https://spdx.org/licenses/Apache-2.0.html#licenseText)
