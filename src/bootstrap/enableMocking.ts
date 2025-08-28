export async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCK !== 'true') return;

  const { worker } = await import('../mocks/browser');

  // onUnhandledRequest: "bypass" จะไม่ throw เมื่อปล่อยให้เรียก backend จริง
  await worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });
}
