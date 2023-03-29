type StatusCodes = 'ok'
| 'created'
| 'noContent'
| 'badRequest'
| 'unauthorized'
| 'notFound'
| 'unprocessableEntity'
| 'internalServerError';

const statusCodes = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  unprocessableEntity: 422,
  internalServerError: 500,
};

const mapError = (type: StatusCodes) => statusCodes[type] || 500;

export default statusCodes;
export { mapError, StatusCodes };
