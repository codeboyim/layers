var fs = require('fs'),
    babel = require('babel');

var script = '',
    len = 0,
    models = fs.readdirSync('src/models'),
    views = fs.readdirSync('src/views'),
    templates = fs.readdirSync('src/templates'),
    regExpFileName = /(.*)\..*/gi;

models.forEach(function(m) {
    script += fs.readFileSync('src/models/' + m);
})

templates.forEach(function(t) {
    var fn = regExpFileName.exec(t)[1],
        varName = 'var tmpl' + String.fromCharCode(fn.charCodeAt(0) - 32) + fn.substr(1);
    script += varName + '=\'' + fs.readFileSync('src/templates/' + t).toString().replace('\'', '\\\'') + '\';';
})

views.forEach(function(v) {
    script += fs.readFileSync('src/views/' + v);
})

script += fs.readFileSync('src/main.js');
script = babel.transform(script).code;

script = fs.readFileSync('build/preFrag.js') + script;
script += fs.readFileSync('build/postFrag.js');

fs.writeFileSync('dist/main.js', script);
