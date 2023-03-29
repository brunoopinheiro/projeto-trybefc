const validLogin = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const invalidLogin = {
  email: '@exemplo',
  password: '12345',
  wrongPassword: 's0u_h4ck3r',
  wrongEmail: 'naocadastrado@email.com'
}

const returnedUser = {
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
}

export { validLogin, invalidLogin, returnedUser };
