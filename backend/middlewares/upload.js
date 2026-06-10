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
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, Word, and image files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;