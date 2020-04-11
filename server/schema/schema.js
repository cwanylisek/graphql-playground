const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data 

const books = [
    { name: 'Inny swiat', genre: 'History', id: 1 },
    { name: 'Sowieci', genre: 'History', id: 2 },
    { name: 'Brave New World', genre: 'Fantasy', id: 3 },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                //code to get data from db/other source
                return _.find(books, { id: args.id });
            }
        }
    }
});

module.export = new GraphQLSchema({
    query: RootQuery
})