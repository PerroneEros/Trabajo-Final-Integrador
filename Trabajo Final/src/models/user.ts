import UserAttributes from './Interface/userAttributes'

class User implements UserAttributes {
  public id_user!: number
  public name!: string
  public email!: string
  public password_hash!: string
  public rol!: string | 'cliente'
  public readonly create!: string
  public image!: string
  public username!: string
  constructor(userData: User) {
    this.id_user = userData.id_user
    this.name = userData.name
    this.email = userData.email
    this.password_hash = userData.password_hash
    this.rol = 'cliente'
    this.image = userData.image
    this.username = userData.username
    this.create = '23/10/25'
  }
}

export default User
