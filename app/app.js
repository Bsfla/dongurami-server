'use strict';

const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const board = require('./src/apis/boards');
const root = require('./src/apis/root');
const review = require('./src/apis/review');
const home = require('./src/apis/circle-home');
const adminOption = require('./src/apis/admin-option');

app.use('/api/board', board);
app.use('/api', root);
app.use('/api/club/review', review);
app.use('/api/club/home', home);
app.use('/api/club/admin-option', adminOption);
module.exports = app;
