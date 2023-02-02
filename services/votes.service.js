const models = require('../database/models')
const CustomError = require('../utils/custom-error')

class VotesService {

  constructor() {
  }

  async findUserVotes(profile_id) {
    const votes = await models.Votes.findAll({
      where: {
        profile_id: profile_id
      }
    })
    return votes
  }

  async createOrDestroyVote(profile_id, publication_id) {
    const publication = await models.Publications.findByPk(publication_id)
    if (!publication) { throw new CustomError('Not found Publication', 404, 'Not found:') }

    const transaction = await models.sequelize.transaction()
    try {
      const oldVote = await models.Votes.findOne({
        where: {
          profile_id,
          publication_id
        }
      })

      if (oldVote) {
        await oldVote.destroy({ transaction })

        await transaction.commit()
        return null
      }
      const newVote = await models.Votes.create({
        profile_id: profile_id,
        publication_id: publication.id
      }, { transaction })

      await transaction.commit()
      return newVote
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = VotesService