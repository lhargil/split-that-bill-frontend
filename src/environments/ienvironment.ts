export interface IEnvironment {
    production: boolean;
    name: string;
    baseUrl: string;
    auth: {[key: string]: string};
}