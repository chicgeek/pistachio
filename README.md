# Pistachio [![Travis][img-travis]][travis]

[travis]: https://travis-ci.org/graze/pistachio
[heroku]: http://pistachio.graze.com

[img-travis]: https://img.shields.io/travis/graze/pistachio/master.svg

The graze front end framework and [style guide](http://pistachio.graze.com).

<img src="http://i.giphy.com/104bRNqTMy2wE.gif" width="250">

## Versioned Releases

Pistachio is available on the CloudFront CDN, with CORS support enabled.

[View Versioned Releases](https://github.com/graze/pistachio/releases).

## CSS

### Development Release

A development release is available, uncached, and redeployed on every push to the master branch. Not recommended for use in live websites, use the [latest versioned release instead](https://github.com/graze/pistachio/releases).

```html
<link href="https://pistachio-cdn.graze.com/dev/css/pistachio.css" rel="stylesheet">
```

### Modular CSS

For versioned releases of modules modify the url like so: `https://pistachio-cdn.graze.com/<version>/css/<module>.css`

#### Core CSS only

 - [Common](https://pistachio-cdn.graze.com/dev/css/common.css)

#### Optional Modules

 - [Accordion](https://pistachio-cdn.graze.com/dev/css/accordion.css)
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

## JavaScript

### Development Release

A development release is available, uncached, and redeployed on every push to the master branch. Not recommended for use in live websites, use the [latest versioned release instead](https://github.com/graze/pistachio/releases).

```html
<script src="https://pistachio-cdn.graze.com/dev/js/pistachio.js"></script>
```

### Dependencies

Requires Jquery which can be loaded via CDN or locally.

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
```

## Development

### Getting Started

```bash
~$ git clone https://github.com/graze/pistachio.git
~$ npm install -g gulp
~$ cd pistachio
~$ npm install
```

### Local Style Guide

Once everything is installed simply run to view the style guide locally:

```bash
~$ npm run docs
```

Docs should now be visible on ```http://localhost:4000/```

The style guide is a simple express app. More information about the express app can be found in the [site README](site/README.md).

### LESS Compilation

To watch LESS for changes and recompile the CSS:

```bash
~$ npm run docs
```

### JavaScript Compilation

To compile the JavaScript:

```bash
~$ gulp build:js
```

## Deploying

The projects documentation and style guide is deployed to Heroku on every push to the master branch and is visible at http://pistachio.graze.com/.

Follow these simple steps to deploy a new version:

1. Update `version` within `package.json`
2. Commit the change to a new branch ([with a good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html))
3. Push the new branch (`git push`)
4. [Open a pull request](https://github.com/graze/pistachio/pull/new/master) and get it merged
5. Tag the change (`git tag v0.0.x` )
6. Push the tag (`git push --tags`)
7. Travis CI will publish the new version to CloudFront
8. [Update the release notes on GitHub](https://github.com/graze/pistachio/releases)
