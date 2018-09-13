import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Users} from "../entity/Users";

/**
 * Loads user from the database.
 */
export async function GetUser(request: Request, response: Response) {

    // get a post repository to perform operations with post
    const userRepository = getManager().getRepository(Users);

    // load a post by a given post id
    const user = await userRepository.find(request.body);

    // return loaded posts
    if(user.length != 0) {
        response.send({data: 'verified'});
    } else {
        response.send({data: 'unsuccessful'});
    }
    
}


export async function SaveUser(request: Request, response: Response) {
     // get a post repository to perform operations with post
     const userRepository = getManager().getRepository(Users);

     // create a real post object from post json object sent over http
    const newUser = userRepository.create(request.body);
     // load a post by a given post id
     const user = await userRepository.save(newUser);
 
     // return loaded posts
     response.send(user);
}