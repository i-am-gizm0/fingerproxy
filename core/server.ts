import { FlowConfig } from ".";
import { execute } from "./flow";

export function serve(flow: FlowConfig): void {
    const server = Bun.serve({
        async fetch(request) {
            const url = new URL(request.url);
            if (url.pathname !== '/.well-known/webfinger') {
                return new Response(null, { status: 404 });
            }
            return await execute(flow, request);
        },
    })
    console.log(`Listening on ${server.hostname}:${server.port}`);
}
