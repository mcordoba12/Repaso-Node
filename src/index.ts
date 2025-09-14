import express, { Express, Request, Response, NextFunction } from "express";
import { processRouter, executionRouter } from "./routes";
import { db } from "./config/connectionDB";

const app: Express = express();

process.loadEnvFile()

const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api/process", processRouter.router);
app.use("/api/execution", executionRouter.router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hola mundo!!!");
});

db.then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
})