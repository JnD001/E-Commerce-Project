const { MongoClient } = require('mongodb'); // Use destructuring to import MongoClient
const state = {
    db: null
};

module.exports.connect = async function (done) {
    const url = 'mongodb://localhost:27017';
    const dbname = 'Shopping';

    try {
        const client = await MongoClient.connect(url, {
            useNewUrlParser: true, // Optional settings (recommended)
            useUnifiedTopology: true // Recommended for better connection handling
        });
        state.db = client.db(dbname);
        done(); // Indicate successful connection
    } catch (err) {
        done(err); // Pass the error to the callback
    }
};

module.exports.get = function () {
    return state.db;
};
