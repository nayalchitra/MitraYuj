const requestLogger = (req,res, next)=>{
    const data = `${Date.now()} ${req.method} ${req.path} `;
    console.log({data})
    next();
}

module.exports = requestLogger;