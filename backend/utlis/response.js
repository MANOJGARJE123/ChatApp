const responseUtils = {
    success : (res, data, message = 'success', statusCode = 200) =>{
        return res.status(statusCode).json({
            success: true,
            message,
            data
        })
    },

    error:(res, message = "Error Occurred", statusCode = 400, errors = null) =>{
        return res.status(statusCode).json({
            success: false,
            message,
            data
        })
    }
}

module.exports = responseUtils;