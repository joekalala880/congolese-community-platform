const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "congolese-community-uploads",
    resource_type: "auto",
    type: "upload",
    access_mode: "public",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf", "doc", "docx"]
  }
});

const upload = multer({ storage });

module.exports = upload;