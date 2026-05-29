const express = require("express");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/", (req, res) => {
  upload.single("file")(req, res, function (error) {
    if (error) {
      console.error("UPLOAD ERROR:", error.message);
      console.error(error);

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

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: req.file.path,
      fileName: req.file.originalname
    });
  });
});

module.exports = router;