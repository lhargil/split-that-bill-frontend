declare var $ENV: ENV;
declare var __Yoyo__: boolean;
declare var NODE_ENV: string;

interface ENV {
  Environment: string;
  BaseURL: string;
  Auth: { [key: string]: string };
}
