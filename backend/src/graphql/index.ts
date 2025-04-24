import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Organization } from "./organization";

async function createApolloGraphqlServer(){
 const myserver=new ApolloServer({
         typeDefs:`
            ${User.typeDefs}
            ${Organization.typeDefs}
             type Query{
               ${User.queries}
               ${Organization.queries}
             }
             type Mutation{
                ${User.mutations}
                ${Organization.mutations}
             }
         `,
         resolvers:{
             Query:{
                ...User.resolvers.queries,
                ...Organization.resolvers.queries
             },
             Mutation:{
                ...User.resolvers.mutations,
                ...Organization.resolvers.mutations
             },
         }
     })
     await myserver.start();
     return myserver;
}

export default createApolloGraphqlServer;