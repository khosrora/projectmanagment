const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function hashString(str) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(str, salt);
}

function tokenMaker(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "365 days" });
    return token
}

function verifyJwtToken(token) {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    if (!result?.username) throw { status: 401, success: false, message: "لطفا وارد شوید" }
    return result
}

function createUploadPath() {
    let d = new Date();
    const Year = "" + d.getFullYear();
    const Month = d.getMonth() + "";
    const day = "" + d.getDate();
    const uploadPath = path.join(__dirname, "..", "..", "public", "upload", Year, Month, day);
    fs.mkdirSync(uploadPath, { recursive: true });
    return path.join("public", "upload", Year, Month, day);
}

function createLinkFiles(req, fileAddress) {
    return req.protocol + "://" + req.get("host") + "/" + fileAddress.replace(/[\\\\]/gm, "/")
}

module.exports = {
    hashString,
    tokenMaker,
    verifyJwtToken,
    createUploadPath,
    createLinkFiles
}