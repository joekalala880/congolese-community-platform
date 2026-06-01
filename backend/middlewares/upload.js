const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");

    return {
      folder: "congolese-community-uploads",
      resource_type: isImage ? "image" : "raw",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf", "doc", "docx"]
    };
  }
});

const upload = multer({ storage });

module.exports = upload;