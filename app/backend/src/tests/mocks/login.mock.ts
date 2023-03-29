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
  role: 'admin',
}

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjgwMTIxNDkzLCJleHAiOjE2ODAyMDc4OTN9.MqJG_Y14dEeTbiyXz3FG0kqZBZ08YGX9-bdpXzsMrws';

export { validLogin, invalidLogin, returnedUser, token };
