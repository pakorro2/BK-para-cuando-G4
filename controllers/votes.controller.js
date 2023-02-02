const VotesService = require('../services/votes.service')
// const UsersService = require('../services/users.service')

// const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const votesService = new VotesService()
// const userService = new UsersService()

const getUserVotes = async (request, response, next) => {
  try {
    // const user_id = request.params.user_id
    const profile_id = request.user.profile_id

    // await userService.getUserOr404(user_id)
    // if(!user){
    //   return response.status(404).json({ message: 'id not found' })
    // }
    const userVotes = await votesService.findUserVotes(profile_id)
    return response.status(200).json({ result: userVotes })
  } catch (error) {
    next(error)
  }
}

const addOrDeleteVote = async (request, response, next) => {
  try {
    const profile_id = request.user.profile_id
    const publication_id = request.params.id

    const vote = await votesService.createOrDestroyVote(profile_id, publication_id)

    if (!vote) { return response.status(202).json({ message: 'discarded vote' }) }

    return response.status(201).json({ result: vote, message: 'add vote' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUserVotes,
  addOrDeleteVote
}