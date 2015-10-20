Pistachio
===

<img src="https://camo.githubusercontent.com/a5bca823dee3bb5aa7a9e6cc82abeaf1d78ccf2e/687474703a2f2f692e67697068792e636f6d2f5355625379413179644a74706d2e676966" align="right" alt="Colbert with pistachios" width="200" />

![Heroku](http://heroku-badge.herokuapp.com/?app=graze-pistachio&style=flat)

Graze's front end framework and [style guide](http://pistachio.graze.com).

Getting Started
---

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

#### CSS via CDN
 - [Versioned (latest stable release 0.0.3)](https://pistachio-cdn.graze.com/0.0.3/css/pistachio.css)
 - [Master branch (subject to change without notice)](https://pistachio-cdn.graze.com/dev/css/pistachio.css)

##### Modular CSS via CDN

###### Core css
 - [Common](https://pistachio-cdn.graze.com/dev/css/common.css)

###### Optional Modules
 - [Alerts](https://pistachio-cdn.graze.com/dev/css/alerts.css)
 - [Breadcrumb](https://pistachio-cdn.graze.com/dev/css/breadcrumb.css)
 - [Buttons](https://pistachio-cdn.graze.com/dev/css/buttons.css)
 - [Forms](https://pistachio-cdn.graze.com/dev/css/forms.css)
 - [Navigation](https://pistachio-cdn.graze.com/dev/css/navigation.css)
 - [Off-screen-menu](https://pistachio-cdn.graze.com/dev/css/off-screen-menu.css)
 - [Page-sections](https://pistachio-cdn.graze.com/dev/css/page-sections.css)
 - [Pagination](https://pistachio-cdn.graze.com/dev/css/pagination.css)
 - [Panels](https://pistachio-cdn.graze.com/dev/css/panels.css)
 - [Progress](https://pistachio-cdn.graze.com/dev/css/progress.css)
 - [Stickers](https://pistachio-cdn.graze.com/dev/css/stickers.css)
 - [Tables](https://pistachio-cdn.graze.com/dev/css/tables.css)


Style guide
---

Once installed simply run to view the style guide locally:

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

[More info about the sites](site/README.md)

Deploying
--

The projects documentation is deployed to Heroku on every push to the master branch and is visible at http://pistachio.graze.com/


