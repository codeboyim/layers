var fs = require('fs'),
    babel = require('babel');

var script = '',
    len = 0,
    models = fs.readdirSync('src/models'),
    views = fs.readdirSync('src/views'),
    templates = fs.readdirSync('src/templates');

function es6Transform(file) {
    return babel.transform(fs.readFileSync(file), {
        modules: 'ignore',
        externalHelpers: true
    }).code;
}
script += babel.buildExternalHelpers();

models.forEach(function(m) {

    if (/\.js$/gi.test(m)) {
        script += es6Transform('src/models/' + m);
    }
})

templates.forEach(function(t) {
    var fn;

    if (/\.jst$/.test(t)) {
        fn = /(.*)\..*/gi.exec(t)[1];
        var varName = 'var tmpl' + String.fromCharCode(fn.charCodeAt(0) - 32) + fn.substr(1);

        script += varName + '=\'' + fs.readFileSync('src/templates/' + t).toString()
            .replace(/\'/g, '\\\'')
            .replace(/\"/g, '\\\"')
            .replace(/\r/g, '\\\r')
            .replace(/\t/g, '\\\t')
            .replace(/\n/g, '\\\n') + '\';';
    }
})

views.forEach(function(v) {
    if (/\.js$/gi.test(v)) {
        script += es6Transform('src/views/' + v);
    }
})

script += es6Transform('src/main.js');

script = fs.readFileSync('build/preFrag.js') + script;
script += fs.readFileSync('build/postFrag.js');

fs.writeFileSync('dist/main.js', script);
