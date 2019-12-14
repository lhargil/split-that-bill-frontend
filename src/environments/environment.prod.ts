import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: true,
  baseUrl: $ENV.BaseURL,
  name: $ENV.Environment,
  auth: $ENV.Auth
};
