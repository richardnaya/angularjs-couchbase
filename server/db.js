var dbConfig = require('./config/dbConfig');
var couchbase = require('couchbase'); // couchnode for couchbase
var port = process.env.PORT || 8080; // set the port

module.exports = new couchbase.Connection(dbConfig, function(err) {
    if (err) {
        console.error("Failed to connect to cluster: " + err);
        process.exit(1);
    }

    console.log('Couchbase Connected');
});
