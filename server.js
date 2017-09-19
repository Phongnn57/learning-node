const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (e) => {
        console.log('Unable to append to server log');
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.get('/', (request, response) => {
    // response.send('<h1>Hello world</h1>');
    // response.send({
    //     name: 'Nam Phong',
    //     likes:[
    //         'Coding',
    //         'Games',
    //         'Commics'
    //     ]
    // });
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to handle the request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
