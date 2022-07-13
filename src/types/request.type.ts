import { Request } from 'express';

export type RequestExt = Request & { user: { id: string; role: string } };
