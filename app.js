//jshint esversion:6

// ---------------import modules Start--------------------

import express from "express";

import ejs from "ejs";

import mongoose from "mongoose";

import _ from 'lodash';

// ------------------import modules End---------------------

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static("public"));

// --------------------MONGOOSE Start-----------------------------------------------------

mongoose.connect(`mongodb+srv://admin-xiaotong:C5KYL2r0JqQ5Fp6l@cluster0.k4lze.mongodb.net/JournalDB`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema = new mongoose.Schema({
  title: String,
  post: String
});

const compose = mongoose.model('Compose', itemSchema);

// --------------------MONGOOSE END-----------------------------------------------------

// ------------------------Set Global Variables Start-------------------------------
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// ------------------------Set Global Variables End-------------------------------


app.get('/', (req, res) => {
  compose.find((err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.render('home', {
        homeTitle: "Home",
        homePost: homeStartingContent,
        postList: items
      });
    }
  });

});

app.get('/about', (req, res) => {
  res.render('about', {
    about: aboutContent
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', {
    contact: contactContent
  });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});


app.get('/posts/:topic', (req, res) => {
  const urlInput = req.params.topic;
  console.log(urlInput);
  compose.findOne({
    title: urlInput
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.render('post', {
        postTitle: result.title,
        postID: result._id,
        postContent: result.post
      });
    }
  });
});


app.post('/compose', (req, res) => {

  const post = new compose({
    title: req.body.title,
    post: req.body.post
  });

  post.save().then(() => {
    res.redirect('/');
  });

});

app.post('/delete', (req, res) => {
  const deleteID = req.body.deleteID;
  compose.findByIdAndRemove(deleteID, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('remove item by ID successfully!');
      res.redirect('/');
    }
  });

});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
