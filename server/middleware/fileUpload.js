// const multer = require("multer");
import multer from "multer";

function fileUpload(folderName) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `public/${folderName}`);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
  return multer({ storage: storage });
}
const uploadEmpImg = fileUpload("employee");

export default uploadEmpImg;
// module.exports = {
//   uploadEmpImg: uploadEmpImg,
// };
