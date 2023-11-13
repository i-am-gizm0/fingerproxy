import { FlowConfig } from './types/config';

export async function execute(
    flow: FlowConfig,
    req: Request,
): Promise<Response> {
    console.debug(`Executing flow in response to ${req.url}`);
    const context = new Map<symbol, unknown>();
    let response = new Response(null, { status: 404 });
    for (const process of flow) {
        response = await process(req, response, context);
        if (!response.ok) {
            break;
        }
    }
    return response;
}
