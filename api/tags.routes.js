const express = require('express');
const tagRoutes = express.Router();

// Require Tag model in our routes module
let Tag = require('./tag.model');

// Defined store route
tagRoutes.route('/add').post(function (req, res) {
  let tag = new Tag(req.body);
  tag.save()
    .then(tag => {
      res.status(200).json({'tag': 'tag added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
tagRoutes.route('/').get(function (req, res) {
    Tag.find(function(err, tages){
    if(err){
      console.log(err);
    }
    else {
      res.json(tages);
    }
  });
});

// Find by ID route
tagRoutes.route('/:id').get(function (req, res) {
  let id = req.params.id;
  Tag.findById(id, function (err, tag){
      res.json(tag);
  });
});

//  Defined update route
tagRoutes.route('/update/:id').post(function (req, res) {
    Tag.findById(req.params.id, function(err, tag) {
    if (!tag)
      res.status(404).send("data is not found");
    else {
        tag.name = req.body.name;
        tag.description = req.body.description;

        tag.save().then(tag => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
tagRoutes.route('/delete/:id').get(function (req, res) {
    Tag.findByIdAndRemove({_id: req.params.id}, function(err, tag){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = tagRoutes;