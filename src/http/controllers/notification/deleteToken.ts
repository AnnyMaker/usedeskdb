import {Request, Response, NextFunction} from "express";
import {getConnection} from "../../../connection";
import {Token} from "../../../entity";
import HttpError from "../../../modules/error/HttpError";

const deleteToken = async (req: Request, res: Response, next: NextFunction) => {

    const {token} = req.body;
    const connection =  await getConnection();
    const tokenRepository = connection.getRepository<Token>(Token);
    const tokenRecord = await tokenRepository.findOne({token});
    if(!tokenRecord) {
        return next(new HttpError(404, `Not found token: ${token}`))
    }

    await tokenRepository.remove(tokenRecord);

    return res.send({
        code: 200,
        result: 'success'
    })
};

export default deleteToken;
