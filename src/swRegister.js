/* eslint-disable no-unused-vars,no-console */
if ('serviceWorker' in navigator) {
  let swRegistration = null;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        swRegistration = registration;
        return navigator.serviceWorker.ready;
      })
      .catch((err) => {
        console.log('error register service worker', err);
      });
  });
}
