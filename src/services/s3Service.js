
const {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const path = require("path");
const s3 = require("../config/s3Client");
let uuidv4;


// Initialize uuid dynamically
(async () => {
  const uuidModule = await import("uuid");
  uuidv4 = uuidModule.v4;
})();

const uploadFile = async (fileBuffer, originalName, mimeType, folder = "") => {
  const sanitizedName = path.basename(originalName).replace(/[^a-zA-Z0-9.\-_]/g, "_");
  const uniqueName = `${uuidv4()}_${sanitizedName}`;
  const key = folder ? `${folder}/${uniqueName}` : uniqueName;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
  };

  await s3.send(new PutObjectCommand(params));

  return key ;  

};

const deleteFile = async (key) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
  };
  await s3.send(new DeleteObjectCommand(params));
  return { message: "File deleted successfully" };
};


const getFileUrl = async (key, expiresIn = 60 * 5) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
  });
  const signedUrl = await getSignedUrl(s3, command, { expiresIn });
  return signedUrl;
};

module.exports = {
  uploadFile,
  deleteFile,
  getFileUrl,
};
