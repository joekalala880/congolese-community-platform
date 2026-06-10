const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = file.originalname.split(".").pop().toLowerCase();

    const rawFiles = ["pdf", "doc", "docx"];

    return {
      folder: "congolese-community-uploads",
      resource_type: rawFiles.includes(ext) ? "raw" : "image",
      format: ext,
      type: "upload",
      access_mode: "public",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf", "doc", "docx"],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;