Pistachio
===

<img src="https://camo.githubusercontent.com/a5bca823dee3bb5aa7a9e6cc82abeaf1d78ccf2e/687474703a2f2f692e67697068792e636f6d2f5355625379413179644a74706d2e676966" align="right" alt="Colbert with pistachios" width="200" />

![Heroku](http://heroku-badge.herokuapp.com/?app=graze-pistachio&style=flat)

Graze's front end framework and [style guide](http://pistachio.graze.com).

Getting Started
---

#### CSS via CDN
 - [Latest stable release (0.0.1)](https://pistachio-cdn.graze.com/0.0.1/css/pistachio.css)
 - [Master branch](https://pistachio-cdn.graze.com/dev/css/pistachio.css)

#### Via NPM (quickest)
```
$ npm install -g gulp
$ npm install graze/pistachio
```

#### Via git
```
$ npm install -g gulp
$ git clone https://github.com/graze/pistachio.git ./pistachio
$ cd pistachio && npm install
```

Style guide
---

Once installed simply run to view the opinionated style guide:

```
$ npm run docs
```

Docs should now be visible on ```http://localhost:4000/```

Developing
---

To watch LESS for changes and recompile the CSS:

```
$ npm run dev
```

There is also a dev sandbox where basic un-opinionated examples of markup can be seen:

```
$ npm run dev-docs
```

Dev sandbox should now be visible on ```http://localhost:3000/```


Deploying
--

The projects documentation is deployed to Heroku on every push to the master branch and is visible at http://pistachio.graze.com/


