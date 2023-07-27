const ImageKit = require("imagekit");
const fs = require("fs");
const ErrorHandler = require("../utils/ErrorHandler");
const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = require('../../constant')

const imagekit = new ImageKit({
  publicKey: IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
});


async function uploadImage(file, folder) {
  return new Promise((resolve, reject) => {
    const ext = file.mimetype.split("/")[1].trim();

    if (file.size >= 2000000) {
      // 2000000(bytes) = 2MB
      reject(new Error("Photo size should be less than 2MB"));
    }

    if (ext !== "png" && ext !== "jpg" && ext !== "jpeg") {
      reject(new Error("Only JPG, JPEG or PNG is allowed"));
    }

    const oldPath = file.filepath;
    const fileName = `${Date.now()}_${file.originalFilename}`;

    fs.readFile(oldPath, (err, data) => {
      if (err) {
        reject(err);
      }

      imagekit.upload(
        {
          file: data,
          fileName,
          overwriteFile: true,
          folder: `/${folder}`,
        },
        (error, result) => {
          if (error) {
            reject(error);
          }

          resolve(result?.url);
        }
      );
    });
  });
}

const searchImage = async (name) => {
  const result = await imagekit.listFiles({
    searchQuery: `'name'="${name}"`,
  });
  if (result && result.length > 0) {
    return result[0].fileId;
  }
  return null;
};

async function deleteImage(name) {
  const image = name.split("/")[5];

  try {
    const imageID = await searchImage(image);
    if (imageID) {
      await imagekit.deleteFile(imageID);
    }
  } catch (error) {
    return new ErrorHandler("Failed to update logo", 500);
  }
}

const customerProfileDefaultImage = "https://ik.imagekit.io/uz4hsgydu/Phone_loan_default/user.png?updatedAt=1687869603772"
const adharFrontDefaultImage = "https://ik.imagekit.io/uz4hsgydu/Phone_loan_default/adhar.webp?updatedAt=1687869492661"
const adharBackDefaultImage = "https://ik.imagekit.io/uz4hsgydu/Phone_loan_default/adhar_back.jpg?updatedAt=1687869492621"
const pancardDefaultImage = "https://ik.imagekit.io/uz4hsgydu/Phone_loan_default/pan.webp?updatedAt=1687869492900"
const lightBillDefaultImage = "https://ik.imagekit.io/uz4hsgydu/Phone_loan_default/bill.webp?updatedAt=1687869492791"

module.exports = {
  uploadImage,
  deleteImage,
  customerProfileDefaultImage,
  adharFrontDefaultImage,
  adharBackDefaultImage,
  pancardDefaultImage,
  lightBillDefaultImage
};
