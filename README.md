## heroku-oauthd

**heroku-oauthd** is customized preconfigured [oauthd](https://github.com/oauth-io/oauthd) instance for using at [Heroku](https://heroku.com).

### Differences from original oauthd:
- includes necessary 'postinstall' and 'start' scripts config in package.json: 'postinstall' runs grunt, 'start' starts the app
- already configured: includes necessary plugins.json entries and plugins files. it's really necessary for heroku, because it's impossible to install plugins in [normal way](https://github.com/oauth-io/oauthd/wiki/Plugin-installation-and-usage) due to install.js implementation and [ephemeral-filesystem](https://devcenter.heroku.com/articles/dynos#ephemeral-filesystem). 
_Sidenote: also installing plugins doesn't work on Windows, e.g. see [line 45 of install.coffee](https://github.com/oauth-io/oauthd/blob/1.0.0-beta.17/src/scaffolding/plugins/install.coffee#L45) - it contains ';' as command separator, which is not supported; but fixing only this separator doesn't help._
- plugins includes their node_modules folder, because submodule grunt build doesn't work out-of-box (perhaps this could be easily improved later)
- config.json contains proper port for heroku

### Starting your own oauthd instance at heroku:
TBD

### Copyright
#### oauthd
Copyright (C) 2015 Webshell SAS 
[https://github.com/oauth-io/oauthd](https://github.com/oauth-io/oauthd) and other contributors
#### heroku-oauthd
Copyright (C) 2015 Viachaslau Tyshkavets [pmstss](https://github.com/pmstss/)

### License

[Apache License 2.0](https://spdx.org/licenses/Apache-2.0.html#licenseText)
