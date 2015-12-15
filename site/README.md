Pistachio Express Sites
===
The public docs in the master branch make up the publicly available site here: [http://pistachio.graze.com](http://pistachio.graze.com).  This is a LIVING style guide and thanks to continuous integration is continually updated with component documentation, examples and usage guidance.

TL;DR
---
 - `npm run docs` to run style guide site
 - If a new page is not showing, restart the app!

File Structure
---

```
/
-/site
--/docs // Public docs files
--/lib // Supporting code
```

Architecture
---
In order to run the site we need to do a bit of initial setup first.  `./lib/site.js` sets up the site by locking in the Handlebars templating engine, setting the directory to serve static files from and the port to listen to.  `site.js` takes an object literal for configuring settings like template directories.  This is then used in the site's `app.js`.

Adding a New Page
---
`./lib/pages.js` takes a directory path and scans it for template files to create an object of different pages that can be used to build out both the style guide and the dev site.  All templates are cached on run time, so if you create/delete a page, you will need to restart the site with `CTRL + c` (to stop running the local site) and the `npm run docs` command.  This will then rebuild the index of the site which can be fed as data to the templates to build out navs etc.

All modifications to individual page will be reflected in realtime as template compilation happens on the fly with each page request.

To add a page simply create a new `[template-name].hbs` file in the `./views` directory.  To create a subpage `[parent-page-name]_[child-page-name].hbs`.  Simple!

To give a page some data, in the relative `./app.js` file set a new page context var (top level pages only, all vars will be available to all subpages) like so:

```javascript
pageContext.setPageVars('patterns', {
    foo: [b, a, r]
});
```
