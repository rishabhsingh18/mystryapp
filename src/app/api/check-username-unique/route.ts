import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from 'zod';

import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username : usernameValidation
})

export async function GET(request:Request){
   
    await dbConnect();
    try {
        const {searchParams} = new URL(request.url);
        const queryParams = {username : searchParams.get('username')}
        //validate with zod        
        const result = UsernameQuerySchema.safeParse(queryParams);
        console.log("result",result);
        
        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || []
            return Response.json({
                success : false,
                message : usernameErrors?.length > 0 ?
                usernameErrors.join(', ') : 'Invalid query params',
            },{
                status : 400
            })
        }
        
        const { username } = result.data;
        const user = await UserModel.findOne({username,isVerified:true});
        console.log(user,"user");
        
        if (user) {
            return Response.json({
                success : false,
                message : 'Username already taken',
            },{
                status : 400
            })
        }

        return Response.json({
            success : true,
            message : 'Username is unique',
        },{
            status : 201
        })

    } catch (error) {
        console.log("Error checking username",error);
        return Response.json({
            success : false,
            message : "Error checking username"
        },{
            status : 500
        })
        
    }
}

export async function POST(request:Request) {
    return Response.json({
        success : false,
        message : 'This method is not allowed,only GET',
    },{
        status : 405
    })
}