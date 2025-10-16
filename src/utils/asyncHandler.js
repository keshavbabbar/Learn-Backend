const asyncHandler = (requesetHandler) => {
   (req, res, next) => {
    Promise.resolve(requesetHandler(req, res, next))
    .catch((err) => next(err))
   }
}



export {asyncHandler}




// const asyncHandler = (fn) => (req,res,next) => {
//     try {
//         await fn(req,res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }