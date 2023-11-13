import { proxy } from './modules/flow';
import { addLink } from './modules/transform';
import { serve, type FlowConfig } from './core';

const flow = [
    proxy({
        server: 'example.com'
    }),
    addLink({
        rel: 'http://openid.net/specs/connect/1.0/issuer',
        href: 'https://auth.example.com'
    })
] satisfies FlowConfig;

serve(flow);
