require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const instance = axios.create();

const app = express();

let cache = {};
const emptyCache = {};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

// 7195af58
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=7195af58
// http://www.omdbapi.com/?apikey=[yourkey]&
// http://www.omdbapi.com/?t=godzilla

app.get('/', (req, res) => {
    console.log('req.query: ', req.query)
    if(req.query.i) {
        instance.get(`http://www.omdbapi.com/?i=${req.query.i}&apikey=${process.env.OMDB_API_KEY}`)
            .then(data => {
                console.log('cache status: ', cache !== {})
                res.send(data.data);
                cache[data.data.Title] = data.data
                console.log('cache: ', cache)
            })
            .catch(error => {
                console.log(error);
            })
        // if(cache == {}) {
        //     instance.get(`http://www.omdbapi.com/?i=${req.query.i}&apikey=7195af58`)
        //     .then(data => {
        //         res.send(data.data);
        //         cache[data.data.Title] = data.data
        //         console.log('cache: ', cache)
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
        // } else {
        //     console.log('cache[data.data.Title]: ', cache[data.data.Title])
        //     res.send(cache[data.data.Title])
        // }
    } else if(req.query.t) {
        instance.get(`http://www.omdbapi.com/?t=${req.query.t}&apikey=7195af58`)
            .then(data => {
                res.send(data.data);
                console.log('ttt data.data.Title: ', data.data.Title)
            })
            .catch(error => {
                console.log(error);
            })
    } else if(req.params) {
        console.log('hey')
    }
    
});

module.exports = app;