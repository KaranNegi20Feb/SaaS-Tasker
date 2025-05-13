import { ApolloServer } from "@apollo/server";
import { User } from "./user";
import { Organization } from "./organization";
import { Request } from "./requests";
import { Task } from "./tasks";

async function createApolloGraphqlServer(){
 const myserver=new ApolloServer({
         typeDefs:`
            ${User.typeDefs}
            ${Task.typedefs}
            ${Organization.typeDefs}
            ${Request.typedefs}
             type Query{
               ${User.queries}
               ${Organization.queries}
               ${Task.queries}
               ${Request.queries}
             }
             type Mutation{
                ${User.mutations}
                ${Task.mutation}
                ${Organization.mutations}
                ${Request.mutation}
             }
         `,
         resolvers:{
             Query:{
                ...User.resolvers.queries,
                ...Organization.resolvers.queries,
                ...Task.resolvers.queries,
                ...Request.resolvers.queries
             },
             Mutation:{
                ...User.resolvers.mutations,
                ...Organization.resolvers.mutations,
                ...Task.resolvers.mutation,
                ...Request.resolvers.mutation
             },
         }
     })
     await myserver.start();
     return myserver;
}

export default createApolloGraphqlServer;