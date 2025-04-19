import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer(){
 const myserver=new ApolloServer({
         typeDefs:`
             type Query{
               ${User.queries}
             }
             type Mutation{
                ${User.mutations}
             }
         `,
         resolvers:{
             Query:{
                ...User.resolvers.queries,
             },
             Mutation:{
                ...User.resolvers.mutations,
             },
         }
     })
     await myserver.start();
     return myserver;
}

export default createApolloGraphqlServer;