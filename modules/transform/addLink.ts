import { ConfigModule } from "../../core/types/config";

export type LinkBody = {
    rel: string;
    type?: string;
    href?: string;
    titles?: { [key: string]: string };
    properties?: { [key: string]: string | null };
} & { [key: string]: string };

const addLink = ((config) => {
    console.log(`Configured module to add link`, config, `to data`);
    return async (req, res) => {
        const body = await res.json();
        const { links, ...rest }: { links?: LinkBody[], [key: string]: unknown } = body;
        (links ?? []).push(config);
        return Response.json({ links, ...rest });
    };
}) satisfies ConfigModule<[LinkBody]>;

export default addLink;
