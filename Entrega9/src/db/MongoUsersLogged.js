
// import { usersLogged } from "./schema/UsersLoggedSchema.js"

// class UsersLoggedDB {

//     constructor(URL) {
//         this.URL = URL
//     }

//     async create(username, password, sessionId) {
//         try {
//             await mongoose.connect(this.URL, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             })

//             await users.create({ username: username, password: password, sessionId: sessionId })

//         } catch (error) {
//             throw new Error('Error create users logged Collection:' + error)

//         } finally {
//             await mongoose.disconnect()
//         }
//     }

//     async read(sessionId) {
//         try {
//             await mongoose.connect(this.URL, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true
//             })
//             return await users.find({ sessionId: sessionId })


//         } catch (error) {
//             throw new Error('Error read:' + error)

//         } finally {
//             await mongoose.disconnect()
//         }

//     }

//     async upgrade() {

//     }

//     async delete(sessionID) {
//         try {
//             await usersLogged.deleteOne({ sessionId: sessionID })
//         } catch (error) {
//             throw new Error("Error Eliminando Session ID: " + error)
//         }
//     }

// }


// export default UsersLoggedDB