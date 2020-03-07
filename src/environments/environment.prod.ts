import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: true,
  baseUrl: process.env.SPLIT_THAT_BILL_BASEURL,
  name: process.env.SPLIT_THAT_BILL_ENVIRONMENT,
};
