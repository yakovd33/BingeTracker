import { doesEmailExist, isEmailValid, getUserRowByEmail, checkPassHash } from '@shared/functions';
import { Request, Response } from 'express';
import DB from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import trakt from '../trakt';
import { CustomRequest } from 'src/@types/express/CustomRequest';

const saltRounds = 10;
// const TOKEN_KEY = process.env.TOKEN_KEY;
const TOKEN_KEY = 'sdfJ23145!%ADF!14';

export async function getAllUsers(req: Request, res: Response) {
    return res.status(200).json();
}

export async function register (req: CustomRequest<{ email: string, password: string, rePass: string }>, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    const rePass = req.body.rePass;

    let response = {
        error: '',
        success: false
    }

    // Check if email is valid
    if (isEmailValid(email)) {
        // Check if email already exists
        let emailExists = await doesEmailExist(email);
        
        if (!emailExists) {
            if (password == rePass) {
                // Hash password
                bcrypt.genSalt(saltRounds, (err : any, salt : string) => {
                    bcrypt.hash(password, salt, (err : any, passwordHashed : string) => {
                        // Save user to DB
                        DB.query("INSERT INTO users (email, pass_hashed) VALUES ($1, $2)", [ email, passwordHashed ]);
                    });
                });
            } else {
                // Passwords do not match
                response['error'] = 'Password do not match.';
            }
        } else {
            // Email exists
            response['error'] = 'Email already exists.';
        }
    }
    
    res.status(200).json(response);
}

export async function login (req: CustomRequest<{ email: string, password: string }>, res: Response) {
    const email = req.body.email;
    const password = req.body.password;

    let response = {
        error: '',
        success: false,
        token: '',
        user: null
    }

    // Check if email already exists
    let emailExists = await doesEmailExist(email);
    
    if (emailExists) {
        let userRow : any = await getUserRowByEmail(email);

        if (userRow) {
            // Check if password hashes match            
            let compare = await checkPassHash(password, userRow.pass_hashed)                        

            if (compare) {
                const token = jwt.sign(
                    { user_id: userRow.id, email },
                    TOKEN_KEY,
                    { expiresIn: "999999h" }
                );

                delete userRow.pass_hashed;

                userRow.token = token;
                response['user'] = userRow;
                // response['user']['token'] = token;
                response['success'] = true;
            } else {
                response['error'] = 'Password is incorrect.';
            }
        }
    } else {
        response['error'] = 'Email does not exist.';
    }

    res.status(200).json(response);
}

export async function traktRedirect (req: Request, res: Response) {
    trakt.exchange_code(req.query.code, req.query.state).then((result : any) => {
        // contains tokens & session information
        // API can now be used with authorized requests
        const token = trakt.export_token();
    });
    
    res.send('');

}