
const _tableName = {
    user: "User",
    assets: "Assets",
}

const _collectionName = {
    activitylogs: "Activity Logs",
}

const _userType = {
    user: "user",
    admin: "admin",
    viewer: "viewer",
}


const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.pdf', '.txt'];
const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'application/pdf', 'text/plain'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

module.exports = { _tableName, _collectionName, _userType, ALLOWED_EXTENSIONS, ALLOWED_MIME_TYPES , MAX_FILE_SIZE };  