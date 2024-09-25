function errorHandler(error, req, res, next) {
    
    if (res && res.headersSent) {
      return next(error);
    }
   
    res.status(error.code || 500);
    res.json({ message: error.message || "Une erreur est survenue !" });
  }
  
  module.exports = errorHandler;
  