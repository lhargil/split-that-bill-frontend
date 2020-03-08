import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  baseUrl: process.env.SPLIT_THAT_BILL_BASEURL,
  name: 'development',
  siteUrl: process.env.SPLIT_THAT_BILL_SITEURL
};

