import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  baseUrl: $ENV.BaseURL,
  name: $ENV.Environment,
};

