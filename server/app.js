const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// mongoose database connect
mongoose.connect(
    "mongodb+srv://cwanylisek:test####@clustergraphql-scurx.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch(err => console.log("Error:", err.message));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for reqiest on port 4000');
});