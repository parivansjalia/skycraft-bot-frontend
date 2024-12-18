import express, { Request, Response } from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const port = 4000;

// Enable CORS for frontend requests
app.use(cors());

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName); // Add timestamp to avoid name conflicts
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["video/mp4"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Accept file
    } 
  },
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
});

// API Endpoint for file uploads
app.post("/upload", upload.single("file"), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }
  res.status(200).json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

// Error handling middleware for upload errors
app.use((err: any, req: Request, res: Response, next: Function) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ message: `Multer error: ${err.message}` });
  } else if (err) {
    res.status(400).json({ message: `Error: ${err.message}` });
  } else {
    next();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
