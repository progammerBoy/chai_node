import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudnary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    //    get user detaial front-em
    //    validation - not empty
    //    check if set is already exixt - username, email
    //    check for images - check for avator
    //    upload them to cloudinary - avatar
    //    create ser object - create entry in db
    //    remove password ad refreash token field from response
    //    check for user creation
    //    reeturn res

        // res.status(200).json({
        //     success: "ok",
        // })

        const {fullName, email, username, password} = req.body
        console.log("email: ", email);

        if(
            [fullName, username, email, password].some((field) => field?.trim()==="")
        ){ 
          throw new ApiError(400, "All fields are required")
        }


        const exixtUser = User.findOne({
            $or: [{username}, {email}],
        } )

        if(exixtUser){
            throw new ApiError(409, "user with email and username alreasy exist")
        }

       const avatarLocalPath = req.files?.avatar[0]?.path
      const coverImageLocalPath = req.files?.coverImage[0]?.path
       

      if(!avatarLocalPath){
        throw new ApiError(400, "avatar is required")
      }

      const avatar = await uploadOnCloudnary(avatarLocalPath);
      const coverImage =  await uploadOnCloudnary(coverImageLocalPath)

      if(!avatar){
        throw new ApiError(400, "avatar file is required")
      }


     const user =  await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
      })


      const createdUser = await User.findById(user._id).select("-password -refreshToken")

      if(!createdUser){
        throw new ApiError(500, "something wents wrong while registering user")
      
      }

      return res.status(201).json(new ApiResponse(200, "user created successfully", createdUser))


        // res.status(200).json({
        //     success: "ok",
        // })

    }
)

export {registerUser}