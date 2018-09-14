import "reflect-metadata";
import {createConnection} from "typeorm";
import {Users} from "./entity/Users";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from './routes';

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(function (req, res, next) {        
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
        res.setHeader('Access-Control-Allow-Credentials', true);       
        next();  
    }); 

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    // run app
    app.listen(3000);

    console.log("Express application is up and running on port 3000");
    
}).catch(error => console.log(error));
