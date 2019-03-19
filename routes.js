module.exports = (app) => {
    var todoList = require('./controller');

    app.route('/').get(todoList.index);

    app.route('/users').get(todoList.users);
};