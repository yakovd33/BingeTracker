const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from 'express';
import { TypedRequestQueryHeadersParams } from '../@types/express/CustomRequest';

const config = process.env;

export const verifyToken = (req : TypedRequestQueryHeadersParams<any, any, any, any>, res : Response, next : NextFunction) => {
	const token = req.body.token || req.query.token || req.headers.token;

	if (!token) return res.status(403).send("A token is required for authentication");	

	try {
		const decoded = jwt.verify(token, config.TOKEN_KEY);
		req.user = decoded;
	} catch (err) {		
		return res.status(401).send("Invalid Token");
	}
	return next();
};

export const checkConnected = (req : TypedRequestQueryHeadersParams<any, any, any, any>, res : Response) => {
	const token = req.body.token || req.query.token || req.headers.token;

	if (!token) return false;

	try {
		const decoded = jwt.verify(token, config.TOKEN_KEY);
		return decoded;
	} catch (err) {		
		return false;
	}
}

export const verifyAdmin = (req : TypedRequestQueryHeadersParams<any, any, any, any>, res : Response, next : NextFunction) => {
	verifyToken(req, res, () => {
		if (req.headers.userId) {
			let userId = req.headers.userId;

			if (req.user.user_id == userId && req.user.isAdmin) {
				next();
			} else {
				res.status(403).send("You're not authorized to do that.")
			}
		} else {
			return res.status(401).send('No uid found');
		}
	});
};