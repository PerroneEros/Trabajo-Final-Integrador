interface UserAttributes {
  id_user: number
  name: string
  email: string
  password_hash: string
  rol: string | null
  image: string
  username: string
}
export default UserAttributes
