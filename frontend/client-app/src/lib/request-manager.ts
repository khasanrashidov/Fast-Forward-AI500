/**
 * Request Manager - Cancels ongoing requests when navigating away
 * 
 * This manager tracks all active AbortControllers and cancels them
 * when the route changes.
 */

// Store for active abort controllers
const activeControllers = new Set<AbortController>();

/**
 * Create an AbortController that will be tracked and cancelled on navigation
 */
export function createTrackedController(): AbortController {
  const controller = new AbortController();
  activeControllers.add(controller);
  
  // Clean up when the request completes (success or failure)
  controller.signal.addEventListener('abort', () => {
    activeControllers.delete(controller);
  });
  
  return controller;
}

/**
 * Remove a controller from tracking (call when request completes)
 */
export function untrackController(controller: AbortController): void {
  activeControllers.delete(controller);
}

/**
 * Cancel all ongoing requests - call this on route change
 */
export function cancelAllRequests(): void {
  activeControllers.forEach((controller) => {
    try {
      controller.abort();
    } catch {
      // Ignore errors from already-aborted controllers
    }
  });
  activeControllers.clear();
}

/**
 * Get the count of active requests (for debugging)
 */
export function getActiveRequestCount(): number {
  return activeControllers.size;
}

