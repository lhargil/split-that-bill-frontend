declare var $ENV: ENV;

interface ENV {
    Environment: string;
    BaseURL: string;
    Auth: {[key:string]: string};
}