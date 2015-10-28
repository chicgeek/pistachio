# Pistachio [![Heroku](http://heroku-badge.herokuapp.com/?app=graze-pistachio&style=flat)](http://pistachio.graze.com)

Graze's front end framework and [style guide](http://pistachio.graze.com).

<img src="http://i.giphy.com/104bRNqTMy2wE.gif" width="250">

## Getting Started

### Via NPM (quickest)

```bash
$ npm install -g gulp
$ npm install graze/pistachio
```

### Via git

```bash
$ npm install -g gulp
$ git clone https://github.com/graze/pistachio.git
$ cd pistachio && npm install
```

## Content Delivery Network

Pistachio is available on the CloudFront CDN, with CORS support enabled.

[View Versioned Releases](https://github.com/graze/pistachio/releases)

#### Development Release <small>(subject to change without notice)</small>

A development release is available, uncached, and redeployed on every push to the master branch.

```html
<link href="https://pistachio-cdn.graze.com/dev/css/pistachio.css" rel="stylesheet">
```

```html
<script src="https://pistachio-cdn.graze.com/dev/js/pistachio.js"></script>
```

## JS usage

Requires Jquery which can be loaded via CDN or locally

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
```

## Modular CSS

### Core CSS

 - [Common](https://pistachio-cdn.graze.com/dev/css/common.css)

### Optional Modules

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

## Style Guide

Once installed simply run to view the style guide locally:

```
$ npm run docs
```

Docs should now be visible on ```http://localhost:4000/```

## Developing

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

## Deploying

The projects documentation and style guide is deployed to Heroku on every push to the master branch and is visible at http://pistachio.graze.com/.

To deploy a new, cached, version to the CDN, first configure your aws credentials locally (at `~/.aws/credentials`).

Then follow these six simple steps:

1. Update `version` within `package.json`, and update the `README.md`
2. Commit the change ([with a good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html))
3. Tag the change (`git tag v1.0.0`)
4. Push it all to GitHub (`git push && git push --tags`)
5. Publish the release with `gulp publish --for-real` :rocket:
6. [Update the release notes on GitHub](https://github.com/graze/pistachio/tags)
