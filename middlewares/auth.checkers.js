const models = require('../database/models')


class Checkers{

  constructor(){}

  async isAnyRoleByList(request, response, next, roles){
    const user_id = request.user
    
    console.log(user_id)
  }

  async isRoleAdmin(){

  }

  async isAdminOrSameUser(){

  }

  async isTheSameUser(){

  }

}