const controllers = require('./controllers');

controllers.getStatue().then((out) => {
  console.log(out);
});
