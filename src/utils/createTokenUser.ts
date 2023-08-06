interface user{
  username:string,
  id:string
}
const createTokenUser = (user:user) => {
  return { username: user.username, userId: user.id };
};

export default createTokenUser
