var db = require('./db');
var _ = require('underscore');

// Keep track of which names are used so that there are no duplicates
var userNames = (function() {
    var names = {};

    var claim = function(name) {
        if (!name || names[name]) {
            return false;
        } else {
            names[name] = true;
            return true;
        }
    };

    // find the lowest unused "guest" name and claim it
    var getGuestName = function() {
        var name,
            nextUserId = 1;

        do {
            name = 'Guest ' + nextUserId;
            nextUserId += 1;
        } while (!claim(name));

        return name;
    };

    // serialize claimed names as an array
    var get = function() {
        var res = [];
        for (var user in names) {
            res.push(user);
        }

        return res;
    };

    var free = function(name) {
        if (names[name]) {
            delete names[name];
        }
    };

    return {
        claim: claim,
        free: free,
        get: get,
        getGuestName: getGuestName
    };
}());

// export function for listening to the socket
module.exports = function(socket) {
    var name = userNames.getGuestName();

    function getBeers() {
        var q = {
            limit: 20, // configure max number of entries.
            stale: false // We don't want stale views here.
        };

        db.view("beer", "brewery_beers", q).query(function(err, values) {
            // 'by_name' view's map function emits beer-name as key and value as
            // null. So values will be a list of
            //      [ {id: <beer-id>, key: <beer-name>, value: <null>}, ... ]

            // we will fetch all the beer documents based on its id.
            var keys = _.pluck(values, 'id');

            db.getMulti(keys, null, function(err, results) {

                // Add the id to the document before sending to template
                var beers = _.map(results, function(v, k) {
                    v.value.id = k;
                    return v.value;
                });

                // send the new user their name and a list of users
                socket.emit('init', {
                    name: name,
                    users: userNames.get(),
                    beers: beers
                });
            });
        });
    }

    getBeers();

    // notify other clients that a new user has joined
    socket.broadcast.emit('user:join', {
        name: name
    });

    // broadcast a user's message to other users
    socket.on('send:message', function(data) {
        socket.broadcast.emit('send:message', {
            user: name,
            text: data.message
        });
    });

    // validate a user's name change, and broadcast it on success
    socket.on('change:name', function(data, fn) {
        if (userNames.claim(data.name)) {
            var oldName = name;
            userNames.free(oldName);

            name = data.name;

            socket.broadcast.emit('change:name', {
                oldName: oldName,
                newName: name
            });

            fn(true);
        } else {
            fn(false);
        }
    });

    // clean up when a user leaves, and broadcast it to other users
    socket.on('disconnect', function() {
        socket.broadcast.emit('user:left', {
            name: name
        });
        userNames.free(name);
    });
};
