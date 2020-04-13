const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

//dummy data (db)

const books = [
    { name: 'Inny swiat', genre: 'History', id: 1, authorId: 1 },
    { name: 'Sowieci', genre: 'History', id: 2, authorId: 2 },
    { name: 'Nowy wspanialy swiat', genre: 'Fantasy', id: 3, authorId: 3 }
];

const authors = [
    { name: 'Gustaw Herling-Grudzinski', age: 81, id: 1 },
    { name: 'Piotr Zychowicz', age: 40, id: 2 },
    { name: 'Aldous Huxley', age: 69, id: 3 }
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id == parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from db
                return books.find(book => book.id == args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.find(author => author.id == args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})