export type ConfigModule<Parameters extends Array<unknown>> = (...args: Parameters) => FlowProcessor;
export type FlowConfig = FlowProcessor[];
export type FlowProcessor<Context = Map<Symbol, unknown>> = (req: Request, res: Response, ctx: Context) => Promise<Response>;
