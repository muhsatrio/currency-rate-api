var response = require('./res')
var connection = require('./connection');

exports.users = (req, res) => {
    connection.query("SELECT * FROM person", function(error, rows, fileds) {
        if (error) {
            console.log(error);
        }
        else {
            response.ok(rows, res);
        }
    });
};

exports.index = (req, res) => {
    response.ok("Hello world", res);
}