import { Query } from 'express-serve-static-core';

export interface CustomRequest<T> extends Express.Request {
    user?: any;
    body: T
}

export interface TypedRequestQueryHeadersParams<B, Q, H, P> extends Express.Request {
    user?: any,
    body: B,
    query: Q,
    headers: H,
    params: P
}