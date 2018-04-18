# Relationships in Mongo/ mongoose


## Learning Objectives

| Objectives |
| :---- |
| Gain a deeper understanding of Mongo/Mongoose's ability to handle relationships |
| Learn *embedded* relationships, with a sneak peak at *referenced* relationships |
| Design routes for nested resources |
| Build the appropriate queries for nested relationships |

## Relationships in Mongo

There are two ways to form relationships in a document-based database...

#### Embedded Data

* **Embedded Data** is a document directly nested *inside* of other data

example: http://pingax.com/wp-content/uploads/2014/05/mongo-datamodel.png

#### Referenced Data

* **Referenced Data** contains an *id* of a document that can be found somewhere else

There is a tradeoff between *efficiency* and *consistency* depending on which one you choose. Neither is better or worse, they are just different.

Generally speaking, if the relationship is a very **strong** one, where one doesn't have much use without the other, **embedded** is the way to go. If the two resources in the relationship are more **independant** of eachother, it is better to use a **referenced** relationship. 

### Thought exercise: 

For each situation would you use embedded or referenced data? Discuss with a partner and be prepared to explain why.

* A `User` that has many `Tweets`?
* A `Food` that has many `Ingredients`?


### Implementation

Tip: Noteworthy code lines are denoted with the comment: `NOTE`.

**Embedding Data:** The Model

```javascript
var tweetSchema = new Schema({
  body: {
    type: String,
    default: ""
  }
});

var userSchema = new Schema({
  username: {
    type: String,
    default: ""
  },
  tweets: [tweetSchema]	  // NOTE
});
```

In Embedded Data, we let the User Schema know that the tweets array is going to contain Tweets objects that are shaped as described by our tweetSchema. This is done simply, on line 56. 

**Embedded Data:** The Routes

In order to *read* & *create* nested data we need to design appropriate routes.

The most popular, modern convention is RESTful routing. Here is an example of an application that has routes for `Store` and an `Item` models:

#### RESTful Routing
|| | |
|---|---|---|
| **HTTP Verb** | **Path** | **Description** 
| GET | /users | Get all users 
| POST | /users | Create a users 
| GET | /users/:id | Get a users 
| PUT/PATCH | /users/:id | Update a users 
| DELETE | /users/:id | Delete a users 
| GET | /users/:id/tweets | Get all tweets from a users 
| POST | /users/:id/tweets | Create an item for a users 
| GET | /users/:id/tweets/:id | Get an item from a users 
| PUT/PATCH | /users/:id/tweets/:id | Update an item from a users 
| DELETE | /users/:id/tweets/:id | Delete an item from a users 

*In routes resources should not be nested more than one level deep*

So Routes end up looking like this: 

```js
router.get('/users/:id/tweet/:id', ...
```

#### The Queries

For Fetching the right tweet from the right user, we use Mongoose's queries within our routes. 

Here's an example route for getting all of the users, and getting all tweets by a user: 

```js
router.get('/users', (req, res) => {
  db.User.find({}, function(err, users){
    res.send(users);
  });
});
```

And here's a route for all tweets of a specific user:

```
router.get('/users/:id/tweets', (req, res) => {
  db.User.findOne({id: req.params._id}, function(err, user){
    res.send(user.tweets);
  });
});
```

The routes and queries work the same way for referenced data, it's only the Schema that must be set up differently
<details>
  <summary>Sneak peek at <strong>referenced</strong> relationship Schema:</summary>
<br>
<code>var foodSchema = new Schema({ <br>
  name: {<br>
    type: String,<br>
    default: ""<br>
  },<br>
  ingredients: [{<br>
    type: Schema.Types.ObjectId,  // NOTE<br>
    ref: 'Ingredient'<br>
  }]<br>
});<br>
<br>
var ingredientSchema = new Schema({<br>
  title: {<br>
    type: String,<br>
    default: ""<br>
  },<br>
  origin: {<br>
    type: String,<br>
    default: ""<br>
  }<br>
});</code><br>
</details>

<br>

&#x1F535; **Activity** <br>
```
* Open the app.js file in this repo
* Follow the instructions in the comments to fill in the appropriate code
* Profit
* Post your code as a comment to this thread
* Until the end of class
```

