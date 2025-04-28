import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Organization } from "./organization";
import { Task } from "./tasks";

async function createApolloGraphqlServer(){
 const myserver=new ApolloServer({
         typeDefs:`
            ${User.typeDefs}
            ${Task.typedefs}
            ${Organization.typeDefs}
             type Query{
               ${User.queries}
               ${Organization.queries}
             }
             type Mutation{
                ${User.mutations}
                ${Task.mutation}
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
                ...Organization.resolvers.mutations,
                ...Task.resolvers.mutation
             },
         }
     })
     await myserver.start();
     return myserver;
}

export default createApolloGraphqlServer;