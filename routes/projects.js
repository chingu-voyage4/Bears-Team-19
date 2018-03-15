const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json([
    {
      id:'1', 
      title: 'Ultimate to-do list',
      author:'Bears 19', 
      category:['web' ,'development'], 
      keywords:['web', 'react', 'js'], 
      description:'We want to create the ultimate to-do list! The project is already started and we need more developers.\nContact me for more info.',
      lastSaved: new Date(Date.UTC(2018, 3, 15, 11, 32, 45))
    },
    {
      id:'2', 
      title: 'Mario-inspired game for the web',
      author:'Bears 19', 
      category:['gaming'], 
      keywords:['web','react', 'js'], 
      description:'The idea is to create a platformer inspired by Mario and have it run in the browser. We need artists, javascript developers, level designers...',
      lastSaved: new Date(Date.UTC(2018, 2, 27, 18, 3, 2))
    },
    {
      id:'3', 
      title: 'A project with two paragraphs',
      author:'Bears 19', 
      category:['gaming'], 
      keywords:['web','react', 'js'], 
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
      aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Odio euismod lacinia at quis. Gravida dictum fusce ut placerat 
      orci nulla pellentesque. Nullam ac tortor vitae purus faucibus ornare. Ut eu sem integer vitae justo eget magna fermentum. Viverra 
      vitae congue eu consequat ac felis donec et odio. Lacus viverra vitae congue eu consequat ac felis donec. Et ligula ullamcorper 
      malesuada proin libero nunc consequat interdum varius. Mattis nunc sed blandit libero volutpat sed. Pretium viverra suspendisse 
      potenti nullam ac tortor vitae purus. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere. Lectus nulla at 
      volutpat diam ut venenatis tellus in metus. Praesent semper feugiat nibh sed pulvinar proin. Id faucibus nisl tincidunt eget nullam. 
      Adipiscing tristique risus nec feugiat in fermentum posuere urna.\r\n
      \r\n
      Amet luctus venenatis lectus magna. Ac tortor dignissim convallis aenean et tortor at risus. Nunc sed augue lacus viverra vitae. 
      Arcu risus quis varius quam quisque id diam. Elit ullamcorper dignissim cras tincidunt lobortis. Massa vitae tortor condimentum 
      lacinia quis vel eros. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Ornare lectus sit amet est. Ut tellus elementum 
      sagittis vitae et leo duis. Id venenatis a condimentum vitae sapien pellentesque. Pellentesque elit eget gravida cum sociis 
      natoque. Id porta nibh venenatis cras sed felis eget velit.`,
      lastSaved: new Date(Date.UTC(2018, 2, 27, 18, 3, 2))
    },
    {
      id:'4', 
      title: 'And another project',
      author:'Bears 19', 
      category:['gaming'], 
      keywords:['web','react', 'js'], 
      description:'The idea is to create a platformer inspired by Mario and have it run in the browser. We need artists, javascript developers, level designers...',
      lastSaved: new Date(Date.UTC(2018, 2, 27, 18, 3, 2))
    },
    {
      id:'5', 
      title: 'A project with lots of short paragraphs',
      author:'Bears 19', 
      category:['gaming'], 
      keywords:['web','react', 'js'], 
      description:`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
      aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit.\r\n
      \r\n
      Odio euismod lacinia at quis. Gravida dictum fusce ut placerat orci nulla pellentesque. Nullam ac tortor vitae purus faucibus 
      ornare.\r\n
      \r\n
      Ut eu sem integer vitae justo eget magna fermentum. Viverra vitae congue eu consequat ac felis donec et odio. Lacus viverra vitae 
      congue eu consequat ac felis donec.\r\n
      Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Mattis nunc sed blandit libero volutpat sed.\r\n
      Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Diam donec adipiscing tristique risus nec feugiat in fermentum 
      posuere.\r\n
      \r\n
      Lectus nulla at volutpat diam ut venenatis tellus in metus. Praesent semper feugiat nibh sed pulvinar proin. Id faucibus nisl 
      tincidunt eget nullam.\r\n
      \r\n
      Adipiscing tristique risus nec feugiat in fermentum posuere urna.`,
      lastSaved: new Date(Date.UTC(2018, 2, 27, 18, 3, 2))
    },
  ]);
});

module.exports = router;
