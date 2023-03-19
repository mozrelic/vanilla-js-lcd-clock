export function checkIfLoaded(observerCallback, target) {
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver(observerCallback);
  observer.observe(target, config);
}
