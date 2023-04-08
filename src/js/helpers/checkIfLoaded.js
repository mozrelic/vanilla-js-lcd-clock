'use strict';

/**
 *
 * @param {Function} observerCallback - callback to pass to the MutationObserver
 * @param {Node} target - the target node to observe
 * @description Checks a target node for mutations, then executes a callback when the target changes
 */
export function checkIfLoaded(observerCallback, target) {
    const config = { childList: true, subtree: true };

    const observer = new MutationObserver(observerCallback);
    observer.observe(target, config);
}
