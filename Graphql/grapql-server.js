const { ApolloServer, gql } = require('apollo-server');

const users = [
  { name: 'abdallah', dob: '2000-4-12' },
  { name: 'ahmed', dob: '2000-4-12' },
  { name: 'mohamed', dob: '2000-4-12' },
];

const posts = [
  { title: 'post1', body: 'post1 body', user: 'abdallah' },
  { title: 'post2', body: 'post2 body', user: 'ahmed' },
  { title: 'post3', body: 'post3 body', user: 'mohamed' },
  { title: 'post4', body: 'post4 body', user: 'abdallah' },
];

// The GraphQL schema
const typeDefs = gql`
  type User {
    name: String!
    dob: String!
    gender: Gender
    posts(lastPost: Int!): [Post]
  }

  type Post {
    title: String!
    body: String!
    user: User
  }

  type Query {
    allUsers(last: Int!): [User]
    allPosts: [Post]
    searchResult(search: String!): [Post]
  }

  type Mutation {
    createUser(name: String, dob: String, gender: String): [User]
    createPost(title: String, body: String, user: String): [Post]
    deletePost(title: String!): [Post]
  }

  enum Gender {
    Male
    Female
  }

  union SearchResult = Post | User
`;

const resolvers = {
  Mutation: {
    createUser: (parent, args) => {
      users.push(args);
      return users;
    },

    createPost: (parent, args) => {
      posts.push(args);
      return posts;
    },

    deletePost: (parent, args) => {
      const postsFilter = posts.filter((post) => post.title !== args.title);
      return postsFilter;
    },
  },
  Query: {
    allUsers: (_, args, ctx) => {
      console.log('context in allUsers', ctx);
      return users.slice(-args.last);
    },

    allPosts: () => posts,

    searchResult: (_, args) => {
      const result = posts.filter((post) =>
        post.title.includes(args.search.toLowerCase())
      );
      return result;
    },
  },
  User: {
    posts(parent, args, ctx) {
      console.log('context in Posts', ctx);
      const userPosts = posts.filter((post) => post.user === parent.name);
      if (!ctx.isLoggedIn)
        throw new Error('You must be logged in to view posts');
      return userPosts.slice(-args.lastPost);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // console.log(req.headers);
    let isLoggedIn = false;
    const token = req.headers.authorization || '';
    if (token === '123456') isLoggedIn = true;
    return { user: 'abdallah', isLoggedIn };
  },
});

server.listen(8000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
