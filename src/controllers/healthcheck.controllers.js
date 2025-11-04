import { ApiResponse } from "../utils/Api-Response.js";
import { asyncHandler } from "../utils/async-handler.js";

/*
Without async handler we need to use lots of try catch blocks
const healthCheck = async (req,res, next) => {
    try {
        res.status(200).json(
            new ApiResponse(200, {message: "Server is running smoothly"})
        )
    } catch (error) {
        next(error);
    }
}
*/

const healthCheck = asyncHandler(async(req,res) => {
        res.status(200)
        .json(new ApiResponse(200, {message: "Server is running smoothly"})
    )
});

export {healthCheck};