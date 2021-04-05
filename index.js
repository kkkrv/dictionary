const http = require("http");
const url = require("url");
const dictionary = require("./dictionary.json")

const dictionaryHandler = (request, response) => {
    let u = url.parse(request.url);

    response.setHeader('Content-Type', 'application/json;charset=utf-8');

    if (u.pathname === '/readyz') {
        if (dictionary) {
            response.writeHead(200);
            response.end('OK');
        } else {
            response.writeHead(404);
            response.end('Not Loaded');
        }
        return;
    }

    let key = '';
    let decodedPath = decodeURI(u.pathname.substr(1));

    if (decodedPath.length > 0) {
        key = decodedPath.toUpperCase();
    } else {
        let error = {
            error: 'No input'
        }
        response.writeHead('422');
        response.end(JSON.stringify(error));
        return;
    }
    let def = dictionary[key];
    if (!def) {
        response.writeHead(404);
        let error = {
            error: key + " was not found"
        }
        response.end(JSON.stringify(error));
        return;
    }
    let definition = {
        term: key,
        definition: def
    }
    response.writeHead(200);
    response.end(JSON.stringify(definition));
};

const app = http.createServer(dictionaryHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(9000, (err) => {
        if (err) return console.log('error starting server: ' + err);
        console.log('server is listening on 9000');
    });
}


module.exports = app;
