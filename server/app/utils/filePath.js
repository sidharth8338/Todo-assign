//  THIS IS A FUNCTION WHICH WILL PROVIDE THE FILE PATH.
const getFilePath = (fileName, fileId) => `uploads/${fileId}/${fileName}`;

// EXPORTING AS DEFAULT
module.exports = getFilePath;
