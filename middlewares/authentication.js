const jwt = require('jsonwebtoken');

const tokenVerify = (req, res, next) => {

    const token = req.get('token');

    jwt.verify( token, process.env.SEED, (err, decoded) =>{
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    msg: 'Error! Token must be provided'
                }
            })
        }
        
        req.activeUser = decoded.user;

        next();
        
    });

};

module.exports = {
    tokenVerify
}
