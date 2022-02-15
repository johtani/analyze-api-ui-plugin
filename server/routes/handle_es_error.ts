import Boom from '@hapi/boom';
import { get } from 'lodash';

const ERR_ES_INDEX_NOT_FOUND = 'index_not_found_exception';
const ERR_ES_ILLEGAL_ARG = 'illegal_argument_exception';

export function isEsIndexNotFoundError(err: any) {
  return get(err, ['body', 'error', 'type']) === ERR_ES_INDEX_NOT_FOUND;
}

export function isEsIllegalArgumentError(err: any) {
  return get(err, ['body', 'error', 'type']) === ERR_ES_ILLEGAL_ARG;
}

export function convertEsError(response: any, error: any) {
  const message = error.body ? error.body.error.reason : undefined;
  if (isEsIndexNotFoundError(error)) {
    error = Boom.notFound(message, error);
  } else if (isEsIllegalArgumentError(error)) {
    error = Boom.badRequest(message, error);
  }

  if (!Boom.isBoom(error)) {
    const statusCode = error.statusCode;
    if (!error.message) {
      error.message = message;
    }
    error = Boom.boomify(error, {statusCode: statusCode, message: message});
  }
  return response.customError({
    body: error.output.payload,
    statusCode: error.output.statusCode,
    headers: error.output.headers as { [key: string]: string },
  });
}
