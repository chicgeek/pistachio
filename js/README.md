Pistachio JavaScript
===

Our JavaScript aims to be as modular and flexible as our CSS.  The main directory for our JS is `/js/src` which contains Common JS packages.  All JS needs to be built in order to be used in the client using the `npm run build` or `gulp build:js` commands.  These commands wrap Browserify for comilation.

Like LESS, there is a main `pistachio.js` file which contains all commonm library JS and all modules.  A module is defined as a single peice of component javascript which relates to a BEM block. All modules must inject jQuery (to prevent multiple instances being used across scripts) and return a function which takes a jQuery node as the first argument.  All modules are globally available in the `pistachio` object.

