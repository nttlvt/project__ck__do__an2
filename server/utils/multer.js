import multer from "multer";
import path from "path";

// Multer config
export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Images must be jpg/png/jpeg format!!!"), false);
      return;
    }
    cb(null, true);
  },
});