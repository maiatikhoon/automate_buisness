const ActivityLog = require("../models/nosql/ActivityLog");
const { Asset, User } = require("../models/sql");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const { Op, fn, col, literal } = require("sequelize");


module.exports.adminStorageUsage = asyncErrorHandler(async (req, res) => {

    const storageData = await Asset.findAll({
        attributes: [
            "user_id",
            [fn("SUM", col("Asset.size")), "total_storage_bytes"],
            [fn("COUNT", col("Asset.id")), "total_files"],
        ],
        include: [
            {
                model: User,
                as: "uploader",
                attributes: ["username", "email"],
            }
        ],
        group: ["Asset.user_id", "uploader.id"],
    });

    return res.status(200).json({
        status: 200,
        message: "Storage usage across all users fetched successfully",
        data: storageData,
    });
});


module.exports.mostActiveUsers = asyncErrorHandler(async (req, res) => {

    const activeUsers = await ActivityLog.aggregate([
        { $match: { status: "ok" } },
        { $group: { _id: "$userId", totalActions: { $sum: 1 } } },
        { $sort: { totalActions: -1 } },
        { $limit: 10 },
    ]);

    return res.status(200).json({
        status: 200,
        message: "Most active users fetched successfully",
        data: activeUsers,
    });
});


module.exports.totalUploadsDeletions = asyncErrorHandler(async (req, res) => {

    const stats = await ActivityLog.aggregate([
        { $match: { event: { $in: ["upload", "delete"] } } },
        {
            $group: {
                _id: "$event",
                count: { $sum: 1 },
            },
        },
    ]);

    const result = {
        uploads: stats.find((s) => s._id === "upload")?.count || 0,
        deletions: stats.find((s) => s._id === "delete")?.count || 0,
    };

    return res.status(200).json({
        status: 200,
        message: "Total uploads/deletions summary fetched successfully",
        data: result,
    });
});


module.exports.userStorageUsage = asyncErrorHandler(async (req, res) => {

    const { id: userId } = req.user;

    const userStorage = await Asset.findOne({
        attributes: [
            [fn("SUM", col("Asset.size")), "total_storage_bytes"],
            [fn("COUNT", col("Asset.id")), "total_files"],
        ],
        where: { user_id: userId },
        raw: true,
    });

    return res.status(200).json({
        status: 200,
        message: "User storage usage fetched successfully",
        data: userStorage,
    });
});

module.exports.assetTypeDistribution = asyncErrorHandler(async (req, res) => {

    const { id: userId } = req.user;

    const distribution = await Asset.findAll({
        attributes: [
            "mime",
            [fn("COUNT", col("Asset.id")), "count"],
            [fn("SUM", col("Asset.size")), "total_size"],
        ],
        where: { user_id: userId },
        group: ["mime"],
        raw: true,
    });

    return res.status(200).json({
        status: 200,
        message: "Asset type distribution fetched successfully",
        data: distribution,
    });
});


module.exports.recentActivityTimeline = asyncErrorHandler(async (req, res) => {
    const { id: userId } = req.user;

    const activities = await ActivityLog.find({ userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();

    return res.status(200).json({
        status: 200,
        message: "Recent activity fetched successfully",
        data: activities,
    });
});