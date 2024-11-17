import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {getUsers} from '../database.js';
let router = Router()


router.post('/', (req, res) => { // post also useful when you asking something from the user like here
    const username = req.body.username;
    const password = req.body.password;
    let users = getUsers();
    let user = users.find(a => a.username === username && a.password === password);
    //console.log(req.body); //information is coming is in the body that's why we only request body
    if( user = users.find(a => (a.username === username)&&(a.password === password))) { //checking username first then password
       const token = jwt.sign({username: username}, 'my_secret_key', { //we can choose 'my_secret_key', one token for refreshing
            expiresIn: '1h'                                            //second one for getting data
       })
       console.log('Generated Token:', token);

        user.token = token; //storing token from a user, this is for server
        res.json( {
            'username': username,
            'access_token':token,
            'token_type': 'Bearer',
            'expires_in': '1h' // all important information
        })
    }
    else
        res.status(401).json({"error": "Login failed"}); //response if either username or pass is incorrect
})

export default router; // makes it public and possibility to use it directly