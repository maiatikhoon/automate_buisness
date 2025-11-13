const ActivityLog = require("../models/nosql/ActivityLog");

async function logActivity(payload) {
  try {
    await ActivityLog.create(payload); 
  } catch (err) {
    console.error('ActivityLog error:', err.message);
  }
}

module.exports = logActivity ; 