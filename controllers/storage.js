const fs = require("fs");
const path = require("path");

module.exports = {
  uploadRecipe: (req, res) => {
    const file = req.files.image;
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const allowedTypes = ["image/jpeg", "image/gif", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).send({
        error: true,
        message: "Bad request. File type is not allowed.",
      });
    }

    if (file.size > maxFileSize) {
      return res.status(400).send({
        error: true,
        message: "Bad request. File size exceeds the allowed limit.",
      });
    }

    const uploadsDirectory = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadsDirectory)) {
      fs.mkdirSync(uploadsDirectory);
    }

    const storageDirectory = path.join(__dirname, "..", "uploads", "recipes");
    if (!fs.existsSync(storageDirectory)) {
      fs.mkdirSync(storageDirectory);
    }

    const fileName = `${req.user.id}_${file.name}`;

    file.mv(`${storageDirectory}/${fileName}`);

    res.status(201).send({
      error: false,
      message: `File is uploaded successfully!`,
      fileName: fileName,
    });
  },
  delete: (req, res) => {
    const storageDirectory = path.join(__dirname, "..", "uploads");
    const file = `${storageDirectory}/${req.params.filename}`;

    if (!fs.existsSync(file)) {
      return res.status(404).send({
        error: true,
        message: "File not found!",
      });
    }

    fs.unlinkSync(file);

    res.send({
      error: false,
      message: `File with path ${file} is successfully deleted.`,
    });
  },
  uploadAvatar: (req, res) => {
    const file = req.files.image;
    const maxFileSize = 10 * 1024 * 1024; // 10 MB
    const allowedTypes = ["image/jpeg", "image/gif", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).send({
        error: true,
        message: "Bad request. File type is not allowed.",
      });
    }

    if (file.size > maxFileSize) {
      return res.status(400).send({
        error: true,
        message: "Bad request. File size exceeds the allowed limit.",
      });
    }

    const uploadsDirectory = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadsDirectory)) {
      fs.mkdirSync(uploadsDirectory);
    }

    const storageDirectory = path.join(__dirname, "..", "uploads", "avatar");
    if (!fs.existsSync(storageDirectory)) {
      fs.mkdirSync(storageDirectory);
    }

    const fileName = `${req.user.id}_${file.name}`;

    file.mv(`${storageDirectory}/${fileName}`);

    res.status(201).send({
      error: false,
      message: `File is uploaded successfully!`,
      fileName: fileName,
    });
  },
};
