const { Asset } = require("../models/sql");
const { uploadFile, getFileUrl, deleteFile } = require("../services/s3Service");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const path = require("path");
const logActivity = require("../utils/logActivity");

module.exports.uploadAssets = asyncErrorHandler(async (req, res) => {

    const { id: user_id } = req.user || {};
    const { folder = '', tags = [], permissions = null } = req.body;
    const { files } = req;

    if (!files || files.length === 0) {
        return res.status(200).json({ status: 400, message: 'No files provided for upload' });
    }

    const uploadedAssets = [];

    for (const file of files) {

        const key = await uploadFile(file.buffer, file.originalname, file.mimetype, folder);

        const meta = { 
            uploader : user_id , 
            uploadTimestamp: new Date().toISOString(),
            filename : file.originalname,
            contentType: file.mimetype,
        };

        const newAsset = await Asset.create({
            key,
            filename: path.basename(file.originalname),
            user_id,
            mime: file.mimetype,
            size: file.size,
            tags: Array.isArray(tags) ? tags : JSON.parse(tags || '[]'),
            permissions: permissions ? JSON.parse(permissions) : null,
            meta,
        });

        await logActivity({
            event: 'upload',
            userId: user_id,
            assetId: newAsset.id,
            meta: { filename: file.originalname },
            status: 'ok',
        })

        uploadedAssets.push({
            id: newAsset.id,
            filename: newAsset.filename,
            key: newAsset.key,
            mime: newAsset.mime,
            size: newAsset.size,
        });
    }

    return res.status(200).json({
        status: 201,
        message: 'Files uploaded successfully',
        data: uploadedAssets,
    });

})


module.exports.listAssets = asyncErrorHandler(async (req, res) => {

    const { id: user_id, role } = req.user;

    const whereCondition = role === 'admin' ? {} : { user_id };

    const assets = await Asset.findAll({
        where: whereCondition,
        order: [['created_at', 'DESC']],
    });


    const assetsWithUrls = await Promise.all(
        assets.map(async (asset) => ({
            id: asset.id,
            filename: asset.filename,
            key: asset.key,
            mime: asset.mime,
            size: asset.size,
            tags: asset.tags,
            permissions: asset.permissions,
            url: await getFileUrl(asset.key),
        }))
    );

    return res.status(200).json({
        status: 200,
        message: 'Assets fetched successfully',
        data: assetsWithUrls,
    });
})


module.exports.updateAssets = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const { id: user_id } = req.user;
    const { tags, permissions } = req.body;

    const asset = await Asset.findByPk(id);

    if (!asset) {
        return res.status(200).json({
            status: 404,
            message: 'Asset not found',
        });
    }

    if (asset.user_id !== user_id) {
        return res.status(200).json({
            status: 403,
            message: 'You do not have permission to update this asset',
        });
    }

    asset.tags = tags.length > 0 ? tags : asset.tags;

    asset.permissions = permissions ? permissions : asset.permissions;

    await asset.save();

    await logActivity({
        event: 'update',
        userId: user_id,
        assetId: asset.id,
        meta: { updatedFields: Object.keys(req.body) },
        status: 'ok',
    });

    return res.status(200).json({
        status: 200,
        message: 'Asset updated successfully',
        data: asset,
    });
})


module.exports.deleteAssest = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const { id: user_id } = req.user;

    const asset = await Asset.findByPk(id);

    if (!asset) {
        return res.status(200).json({
            status: 404,
            message: 'Asset not found',
        });
    }

    if (asset.user_id !== user_id) {
        return res.status(200).json({
            status: 403,
            message: 'You do not have permission to delete this asset',
        });
    }

    await deleteFile(asset.key);

    await asset.destroy();

    await logActivity({
        event: 'delete',
        userId: user_id,
        assetId: id,
        meta: { key: asset.key, filename: asset.filename },
        status: 'ok',
    });

    return res.status(200).json({
        status: 200,
        message: 'Asset deleted successfully',
    });
})

module.exports.getSharedAssets = asyncErrorHandler(async (req, res) => {

    const { id } = req.params;
    const { id: userId } = req.user;

    const asset = await Asset.findByPk(id);

    if (!asset) {
        return res.status(200).json({ status: 200, message: "Asset not found " });
    }

    const permissions = asset.permissions || {};
    const sharedWith = permissions.sharedWith || [];

    if (asset.user_id !== userId && !sharedWith.includes(userId)) {
        return res.status(200).json({
            status: 403,
            message: "You don't have permission to view this asset",
        });
    }

    const fileUrl = await getFileUrl(asset.key);

    const data = { ...asset.toJSON() , fileUrl };

    return res.status(200).json({ status: 200, data, message: "shared asset fetched successfully" });

})