const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/users');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	// set up your user schema so the user has a username and an array of tweets
	username: String, 
	tweets: [tweetSchema]
});

const tweetSchema = new Schema({
	// set up your tweet schema so the tweet has content.
	content: String
});


// 1) Create a user

let user = new User({username: "sasquatch"}).save();

// 2) Create a tweet, and them save them in the User's tweets

let tweet = new Tweet({content: "Wow, the fifth dimension is like, totally hot right now."}).save();
user.tweets.push(tweet);
user.save();

// 3) List all tweets of that user

console.log(user.tweets)
