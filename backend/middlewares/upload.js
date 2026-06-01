const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "congolese-community-uploads",
      resource_type: "raw",
      type: "upload",
      access_mode: "public",
      allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx", "webp"]
    };
  }
});

const upload = multer({ storage });

module.exports = upload;