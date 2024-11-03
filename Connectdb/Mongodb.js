const mongoose = require('mongoose');

const ConnectDb = () => {
    try {
        mongoose.connect('mongodb://ibra7emdev:rXScBFZPi4wzc1FY@cluster0-shard-00-00.8snwb.mongodb.net:27017,cluster0-shard-00-01.8snwb.mongodb.net:27017,cluster0-shard-00-02.8snwb.mongodb.net:27017/?ssl=true&replicaSet=atlas-mtuutq-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0')
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
}

module.exports = ConnectDb;