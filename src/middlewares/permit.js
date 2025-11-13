

const permit = (...allowedRoles) => {

    return (req, res, next) => {
        try {

            if (!req.user) {
                return res.status(200).json({ status: 401, message: "User not authenticated , Login again" });
            }

            const { role } = req.user;

            if (allowedRoles.length === 0) {
                return next();
            }

            if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
                return res.status(200).json({
                    status: 403,
                    message: 'Access denied',
                });
            } 

            next() ; 

        } catch (error) {
            console.log("permit error ", error.message);
            return res.status(200).json({ status: 500, message: "Authorization failed" });
        }
    }
}


module.exports = permit ; 