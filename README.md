# Pistachio [![Heroku](http://heroku-badge.herokuapp.com/?app=graze-pistachio&style=flat)](http://pistachio.graze.com)

Graze's front end framework and [style guide](http://pistachio.graze.com).

<img src="http://i.giphy.com/104bRNqTMy2wE.gif" width="250">

## Live site

[Live pistachio style guide](https://pistachio.graze.com)

## CSS

Pistachio CSS is available on the CloudFront CDN, with CORS support enabled. Available as a single framework, or as individual modules.

### Versioned Releases

[View Versioned Releases](https://github.com/graze/pistachio/releases)

### Development Release <small>(subject to change without notice)</small>

A development release is available, uncached, and redeployed on every push to the master branch. Not recommended for use in live websites - use the latest versioned release instead.

```html
<link href="https://pistachio-cdn.graze.com/dev/css/pistachio.css" rel="stylesheet">
```

### Modular CSS

(For versioned releases of modules modify the url like so: `https://pistachio-cdn.graze.com/<version>/css/accordion.css`)

[View Versioned Releases](https://github.com/graze/pistachio/releases)

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

### Development Release <small>(subject to change without notice)</small>

A development release is available, uncached, and redeployed on every push to the master branch. Not recommended for use in live websites - use the latest versioned release instead.

```html
<script src="https://pistachio-cdn.graze.com/dev/js/pistachio.js"></script>
```

### Versioned Releases

[View Versioned Releases](https://github.com/graze/pistachio/releases)

### Dependencies

Requires Jquery which can be loaded via CDN or locally

```html
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
```

## Development

### Getting Started

```bash
git clone https://github.com/graze/pistachio.git
npm install gulp
cd pistachio
npm install
```

### Local style guide

Once everything is installed simply run to view the style guide locally:

```
npm run docs
```

Docs should now be visible on ```http://localhost:4000/```

The style guide is a simple express app. 
[More info about the express app](site/README.md).

### LESS compilation

To watch LESS for changes and recompile the CSS:

```
npm run docs
```

### JavaScript compilation

To compile the JavaScript:

```
gulp build:js
```

## Deploying

The projects documentation and style guide is deployed to Heroku on every push to the master branch and is visible at http://pistachio.graze.com/.

To deploy a new, cached, version to the CDN, first configure your aws credentials locally (at `~/.aws/credentials`).

Then follow these six simple steps:

1. Update `version` within `package.json`
2. Commit the change to a new branch ([with a good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html))
3. Push the new branch (`git push`)
4. Open a pull request and get it merged
5. Tag the change (`git tag v0.0.x` )
6. Push new tag (`git push --tags`)
7. Publish the release with `gulp publish --for-real` :rocket:
8. [Update the release notes on GitHub](https://github.com/graze/pistachio/tags)
