const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	// set up your user schema so the user has a username and an array of tweets
});

const tweetSchema = new Schema({
	// set up your tweet schema so the tweet has content.
});


// 1) Create a user

// 2) Create a tweet, and them save them in the User's tweets

// 3) List all tweets of that user
