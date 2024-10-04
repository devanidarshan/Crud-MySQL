module.exports = {
    reply: async function (res , errorcode , isError , message , data) {
        return res.status(200).json({
            msg:message,
            error:isError,
            statusCode:errorcode,
            data:data
        });
    }
};