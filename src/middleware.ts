import { defineMiddleware } from 'astro:middleware';

const privateRoutes = ['/protected'];

export const onRequest = defineMiddleware(
  ({ url, request }, next) => {
    return next();
  }
);
