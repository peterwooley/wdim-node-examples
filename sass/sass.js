var sass = require('sass');

var css = sass.render(
"!red = #ff0000\n" +
"body\n" +
"	:color !red\n");

console.log("Rendered CSS: \n" + css);
