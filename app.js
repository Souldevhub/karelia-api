import app from './apicalls.js'; //just one object from http import {createServer} from http;

app.listen(3000, () => {
    console.log('Listening on port 3000 ..')
})







/*
let homePage = readFileSync(index.html);
let aboutPage = readFileSync(about.html);
let notFoundPage = readFileSync(notfound.html);

let server = createServer((req, res) => {
    if(req.url == '/about')
        res.end(aboutPage)
    else if(req.url == '/')
        res.end(homePage)
    else {
        res.writeHead(404);
        res.end(notFoundPage)
    }

}); //ctrl+c in terminal to interrupt

server.listen(3000); //default with node.js
*/