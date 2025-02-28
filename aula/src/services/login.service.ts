import User from "../model/user.model.ts";
import crypt from "bcryptjs"
import AppError from "../AppError.ts";
import Token from "jsonwebtoken";

export async function loginVerifyService(req: Request, res: Response) {

    // const user = await User.findOne({
    //     where: { email: req.body.email }
    // })

    // if (!user) throw new AppError("Usuário não encontrado", 404)

    // if (!crypt.compareSync(req.body.password, user.password)) throw new AppError("Senha incorreta filhao", 401)

    // let userInfo;

    // switch (user.userType) {
    //     case 0:
    //         userInfo = user;
    //         break;
        
    //     case 1:
    //         userInfo = await User.findOne({
    //             include: {
    //                 model: Nutricionist, 
    //                 as: "Nutricionist",
    //                 required: true,
    //                 where: { userID: user.userID }
    //             }
    //         })

    //         break;

    //     case 2:
    //         userInfo = await User.findOne({
    //             include: {
    //                 model: Pacient, 
    //                 as: "Pacient",
    //                 required: true,
    //                 where: { userID: user.userID }
    //             }
    //         })

    //         break;

    //     default:
    //         break;
    // }

    // console.log("\n\n\n", userInfo)
    
    // res.status(200).json({
    //     token: Token.sign(
    //         { userID: user.userID, userType: user.userType },
    //         "secret-key",
    //         {  }
    //     ),
    //     userInfo
    // })
}