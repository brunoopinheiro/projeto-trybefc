interface ILogin {
  email: string,
  password: string,
  role?: string,
}

interface IToken {
  token: string,
}

export default ILogin;
export { IToken };
