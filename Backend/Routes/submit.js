const express = require('express');
const path = require('path');
const fs = require('fs');
const upload = require('../Middlewares/multer');

const router = express.Router();


router.post('/submit', upload.single('file'), (req, res) => {
  const { language, code } = req.body;
  const uploadedFile = req.file;

  if (!code && !uploadedFile) {
    return res.status(400).json({ message: 'Please provide source code or upload a file.' });
  }

  
  if (code) {
    const filePath = path.join(__dirname, '../uploads', `code-${Date.now()}.txt`);
    fs.writeFileSync(filePath, code, 'utf8');
  }

  return res.status(200).json({ message: 'Code submitted successfully!' });
});

module.exports = router;
