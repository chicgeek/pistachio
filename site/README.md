Pistachio Express Sites
===
We have two different Express apps to support our public docs and our development site.  The public docs in the master branch make up the publicly available site here: [http://pistachio.graze.com](http://pistachio.graze.com).  This is a LIVING style guide and thanks to continuous integration is continually updated with component documentation, examples and usage guidance.

Table of Contents
---
 - [Running Locally](#running-locally)
 - [File Structure](#file-structure)
 - [Architecture](#architecture)
 - [Adding a New Page](#adding-a-new-page)

TL;DR
---
 - `npm run docs` to run style guide site
 - `npm run dev-docs` to run dev site
 - Both sites share some common JS modules and are both run from a common `site.js` file to setup configuration
 - If a new page is not showing, restart the app!

Running Locally
---
Running the two sites locally can be achieved with the following commands.  The sites will run on `http://localhost:[port]`.  The dev site is port `3000` and the style guide `4000`.  To run them simultaneously, you can run the `npm run [site]` in two separate terminal tabs/windows.

```
// Install packages (you should have done this already by now)
$ npm install

// Run style guide
// http://localhost:4000
$ npm run docs

// Run dev site
// http://localhost:3000
$ npm run dev-docs
```

File Structure
---
The templates and app bootstrapping file for each of these are placed in their own directories like so:

```
/
-/site
--/dev  // Development site files
--/docs // Public docs files
```

We also have a `/lib` dir which should contain all files that are genuinely useful across both sites.

Architecture
---
Why write code twice?  In order to run both sites we need to do a bit of initial setup first.  `./lib/site.js` sets up each site by locking in the Handlebars templating engine, setting the directory to serve static files from and the port to listen to.  `site.js` takes an object literal for configuring site specific settings like template directories etc.  This is then including in each site's `app.js` instead of a new `express()` instance so that each site inherits sensible defaults.

Adding a New Page
---
`./lib/pages.js` takes a directory path and scans it for template files to create an object of different pages that can be used to build out both the style guide and the dev site.  All templates are cached on run time, so if you create/delete a page, you will need to restart the site with `CTRL + c` (to stop running the local site) and the relevant `npm run [site]` command.  This will then rebuild the index of sites which can be fed as data to the templates to build out navs etc.

All modifications will be reflected in realtime as template compilation happens on the fly with each page request.

To add a page simply create a new `[template-name].hbs` file in the relative `./views` directory for that site.  To create a subpage `[parent-page-name]_[child-page-name].hbs`.  Simple!

To give a page some data, in the relative `./app.js` file set a new page context var (top level pages only, all vars will be available to all subpages) like so:

```javascript
pageContext.setPageVars('patterns', {
    foo: [b, a, r]
});
```
