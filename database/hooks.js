// const Users = require('./models/users')
// const Profiles = require('./models/profiles')


// module.exports=()=>{
//   return Users.addHook('afterCreate', async(user, options)=>{
//     await Profiles.create({
//       user_id: user.id,
//       role_id: 1
//     })
//   })
// }