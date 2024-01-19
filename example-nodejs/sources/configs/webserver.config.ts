import * as path from "path";

interface WebServerConfig {
    port: number;
    host: string;
    staticPath: {
        appFront: string;
    };
}

const webServerConfig: WebServerConfig = {
    port: isNaN(Number(process.env.HTTP_PORT)) ? 3000 : Number(process.env.HTTP_PORT),
    host: process.env.HTTP_HOST || '0.0.0.0',
    staticPath: {
        appFront: path.join(__dirname, '../', 'public'),
    },
};

export default webServerConfig;
