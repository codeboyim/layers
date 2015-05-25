var fs = require('fs'),
    babel = require('babel');

var script = '',
    len = 0,
    files = fs.readdirSync('src');

files.splice(files.indexOf('main.js'), 1);

files.forEach(function(f) {

		if(f.match(/\.js/gi)){

    script += fs.readFileSync('src/' + f);
		}
})

script += fs.readFileSync('src/main.js', {
    encoding: 'utf8'
});

script = babel.transform(script).code;

script = fs.readFileSync('build/preFrag.js') + script;
script += fs.readFileSync('build/postFrag.js');

fs.writeFileSync('dist/main.js', script);
