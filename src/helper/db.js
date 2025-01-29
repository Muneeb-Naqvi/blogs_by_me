import mongoose from "mongoose"

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'Blogs_By_Muneeb',
        });
        console.log("DB Connected...");
    } catch (error) {
        console.log('Failed To Connect With DataBase')
        console.error(error)
    }
}











// import mongoose from "mongoose"

// export const connectDb = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             dbName: 'Blogs_By_Muneeb',
//         });
//         console.log("DB Connected...");
//     } catch (error) {
//         console.log('Failed To Connect With DataBase')
//         console.error(error)
//     }
// }