import express from 'express';

const router = express.Router();

const routes = [
  { path: '/sellers', module: './sellerRoutes.js' },
  { path: '/products', module: './productRoutes.js' },
  { path: '/customers', module: './customerRoutes.js' },
  { path: '/carts', module: './cartRoutes.js' },
  { path: '/wishlists', module: './wishlistRoutes.js' },
  { path: '/addresses', module: './addressRoutes.js' },
  { path: '/orders', module: './orderRoutes.js' },
  { path: '/auth', module: './authCheckRoute.js' },
  { path: '/payment', module: './paymentRoutes.js' },
];

(async () => {
  for (const { path: routePath, module } of routes) {
    const mod = await import(module);
    const r = mod.default || mod.router || mod;
    router.use(routePath, r);
  }
})();

router.get('/ping', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default router;
