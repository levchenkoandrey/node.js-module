import cors from "cors";
import express, {NextFunction, Request, Response} from "express";
import fileUpload from "express-fileupload";
import reteLimit from "express-rate-limit";
import * as mongoose from "mongoose";

import {configs} from "./configs";
import {cronRunner} from "./crons";
import {authRouter} from "./routers/auth.router";
import {userRouter} from "./routers/user.router";

const app = express();

const apiLimiter = reteLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
});
app.use("/*", apiLimiter);
app.use(
    cors({
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        allowedHeaders: [
            "Authorization",
            "Content-Type",
            "Origin",
            "Access-Control-Allow-Origin",
        ],
        preflightContinue: false,
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
    return res.status(error.status || 500).json(error.message);
});
const dbConnect = async () => {
    let dbCon
    false;
    while (!dbCon) {
        try {
            console.log('Connecting to database');
            await mongoose.connect(configs.DB_URL);
            dbCon = true;
        } catch (e) {
            'Database unavailable, wait three seconds';
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}
const start = async () => {
    try {
        await dbConnect();
         await app.listen(configs.PORT, () => {
            cronRunner();
            console.log(`Server has started on PORT ${configs.PORT} `);
        });
    } catch (e) {
        console.log(e);
    }
}

start();

export const NODE_TLS_REJECT_UNAUTHORIZED = "0";
