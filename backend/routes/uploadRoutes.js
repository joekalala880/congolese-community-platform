const express = require("express");
const upload = require("../middlewares/upload");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

router.post("/", (req, res) => {
  upload.single("file")(req, res, function (error) {
    if (error) {
      console.error("UPLOAD ERROR:", error.message);
      return res.status(500).json({
        message: error.message || "File upload failed"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    console.log("FILE UPLOADED:", req.file.path);
    console.log("PUBLIC ID:", req.file.filename);

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: req.file.path,
      fileName: req.file.originalname,
      filePublicId: req.file.filename
    });
  });
});

router.get("/file/:folder/:fileId", async (req, res) => {
  try {
    const publicId = `${req.params.folder}/${req.params.fileId}`;
    
const fileUrl = cloudinary.url(publicId, {
  resource_type: "raw",
  type: "upload",
  sign_url: true,
});

    return res.redirect(fileUrl);
  } catch (error) {
    console.error("FILE DOWNLOAD ERROR:", error.message);
    return res.status(500).json({
      message: error.message || "Failed to open file"
    });
  }
});

module.exports = router;