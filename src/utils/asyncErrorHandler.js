

function _handleCatchErrors(res, error) {

    console.log("Error", error.message);
    return res.json({ status: 500, mesasge: error.message || "Internal Server Error" });
}

function asyncErrorHandler(fn) {
    return async function (req, res, next) {
        try {
            await fn(req , res , next) ; 
        } catch (error) {
            _handleCatchErrors(res, error);
        }
    }
}

module.exports = asyncErrorHandler ; 