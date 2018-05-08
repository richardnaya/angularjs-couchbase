var tlrg_app = require('./tlrg-app');

// connection configuration to pass on to couchbase.connect(). Note that
// while connecting with the server we are also opening the beer-sample
// bucket.
var config = {
    host: ["localhost:8091"],
    bucket: 'beer-sample'
};

// Check if this file has been loaded directly from node. We don't want people require-ing this file.
if (require.main == module) {
    tlrg_app.start(config);
}
