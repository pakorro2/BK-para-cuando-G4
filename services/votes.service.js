const models = require('../database/models')

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

  async createOrDiscardVote(profile_id, publication_id) {
    const publication = await models.Publications.findByPk(publication_id)
    if (!(publication)) { return false }

    const transaction = await models.sequelize.transaction()
    try {
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