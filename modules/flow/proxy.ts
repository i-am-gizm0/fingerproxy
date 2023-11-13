import { ConfigModule } from "../../core/types/config";

export enum OnProxyErrorReturn {
    ChainTransparent,
    RemoteResponse,
    HTTP500,
    HTTP404,
};

export type ProxyConfig = {
    server: string;
    onError?: {
        return: OnProxyErrorReturn;
    };
};

const proxy = ((config) => {
    console.debug(`Configured module to proxy requests to ${config.server}`);
    return async (req, res) => {
        const url = new URL(req.url);
        url.protocol = 'https';
        url.host = config.server;
        url.port = '443';
        url.pathname = '/.well-known/webfinger';

        console.debug(`Proxying request to ${url}`);

        const response = await fetch(url);
        console.debug(`Remote server responded with ${response.status}`);
        if (response.ok) {
            return new Response(response.body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            switch (config.onError?.return) {
                case OnProxyErrorReturn.HTTP500:
                    return new Response(null, {
                        status: 500
                    });
                
                case OnProxyErrorReturn.HTTP404:
                    return new Response(null, {
                        status: 404
                    });
                
                case OnProxyErrorReturn.ChainTransparent:
                    return res;
                
                case OnProxyErrorReturn.RemoteResponse:
                default:
                    return response;
            }
        }
    }
}) satisfies ConfigModule<[ProxyConfig]>;

export default proxy;
