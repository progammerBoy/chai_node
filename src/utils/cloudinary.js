import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudnary = async function (localFilePath) {

    try {
        if (!localFilePath) return null;
        
        // Upload the file to cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        //  fle has been uploaded successfully
        console.log(response);
        console.log("file is updatted on cloudinary", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved the temporary file as the upload operations got failed
        return null
    }
}

export {uploadOnCloudnary};

