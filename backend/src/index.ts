import express from "express";
import cors from 'cors';
import { expressMiddleware } from "@apollo/server/express4";
import createApolloGraphqlServer from "./graphql";

async function init() {
    const allowedOrigins = ['http://localhost:5173','https://tasks-frontend-ut0n.onrender.com'];
    const app = express();
    app.use(cors({
        origin: allowedOrigins,
        credentials: true,
    }));

    app.use(express.json());

    app.get('/', (req, res) => {
        res.json({ message: "Server is up and running" });
    });

    app.use("/graphql", expressMiddleware(await createApolloGraphqlServer()));

    app.listen(3000, () => {
        console.log(`🚀 Server running at http://localhost:3000/graphql`);
    });
}

init();
