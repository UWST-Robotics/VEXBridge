import {Request, Response} from "express";

/**
 * This function is used to get the session ID from the URL and return it as a number.
 * @param req - The request object
 * @param res - The response object
 * @returns The session ID as a number or null if the session ID is invalid
 */
export default function requireSessionID(req: Request, res: Response): number | null {
    // Get the session ID from the URL
    const sessionID = parseInt(req.params.sessionID);
    if (isNaN(sessionID)) {
        res.status(400).send("Invalid session ID");
        return null;
    }
    return sessionID;
}