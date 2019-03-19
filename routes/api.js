var express = require('express');
var router = express.Router();
var response = require('../res');
var connection = require('../connection');

router.get('/', (req, res, next) => {
    response.ok("This is INDEX API :)", res);
});

router.post('/rate', (req, res, next) => {
    var input_data = {
        'date': req.body.date,
        'from': req.body.from,
        'to': req.body.to,
        'rate': req.body.rate,
    };
    connection.query('INSERT INTO rate(date_rate, from_currency, to_currency, rate_value) VALUES(?, ?, ?, ?)',
        [input_data['date'], input_data['from'], input_data['to'], input_data['rate']],
        (error, rows, fields) => {
            if (error) {
                response.error("Error", res);
            }
            else {
                response.ok("Data inputed successfully! :)", res);
            }
        }
    );
});

router.post('/track', (req, res, next) => {
    var input_data = {
        'from': req.body.from,
        'to': req.body.to,
    };
    connection.query('INSERT INTO track(from_currency, to_currency) VALUES(?, ?)',
        [input_data['from'], input_data['to']],
        (error, rows, fields) => {
            if (error) {
                response.error("Error", res);
            }
            else {
                response.ok("Data inputed successfully! :)", res);
            }
        }
    );
});

router.delete('/track', (req, res, next) => {
    var input_data = {
        'from': req.body.from,
        'to': req.body.to,
    };
    connection.query('DELETE FROM track WHERE from_currency=? AND to_currency=?',
        [input_data['from'], input_data['to']],
        (error, rows, fields) => {
            if (error) {
                response.error("Error - Data can not be deleted :(", res);
            }
            else {
                response.ok("Data deleted successfully! :)", res);
            }
        }
    );
});

router.get('/rate', (req, res, next) => {
    var average_rate;
    var input_data = {
        "date": req.query.date,
    };
    var hehehe;
    var date_now = new Date(input_data['date']);
    date_seven_days_ago = new Date(date_now - (7 * 24 * 60 * 60 * 1000)).toISOString().slice(0,10);
    connection.query("SELECT from_currency, to_currency, rate_value, (SELECT AVG(rate_value) as seven_days_avg FROM rate WHERE STR_TO_DATE(date_rate, '%a, %c %b %Y %k:%i:%s') BETWEEN ? AND ?) AS seven_days_avg FROM rate WHERE date_rate=?",
        [input_data['date'], date_seven_days_ago, input_data['date']],
        (error, rows, fields) => {
            if (error) {
                response.error(error, res);
            }
            else {
                response.ok(rows, res);
            }
        }
    );
});

router.get('/rate_trend', (req, res, next) => {
    var average_rate;
    var input_data = {
        "from": req.query.from,
        "to": req.query.to,
        "average": req.query.average,
        "variance": req.query.variance,
    };
    var date_now = new Date(input_data['date']);
    var average_max = parseFloat(input_data['average'])+parseFloat(input_data['variance']);
    var average_min = parseFloat(input_data['average'])-parseFloat(input_data['variance']);
    connection.query("SELECT date_rate, rate_value FROM rate WHERE (rate_value BETWEEN ? AND ?) AND (from_currency=? AND to_currency=?) ORDER BY rate_value DESC LIMIT 7",
        [average_min, average_max, input_data['from'], input_data['to']],
        (error, rows, fields) => {
            if (error) {
                response.error(error, res);
            }
            else {
                response.ok(rows, res);
            }
        }
    );
});


module.exports = router;