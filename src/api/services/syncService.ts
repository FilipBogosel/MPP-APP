export type SyncAction = {
  id: string;
  method: "POST" | "PUT" | "DELETE";
  endpoint: string;
  payload?: any;
};

const OFFLINE_QUEUE_KEY = "offline_queue";

function readQueue(): Array<SyncAction> {
  const rawQueue = localStorage.getItem(OFFLINE_QUEUE_KEY);

  if (!rawQueue) {
    return [];
  }

  try {
    const parsedQueue = JSON.parse(rawQueue) as unknown;
    return Array.isArray(parsedQueue) ? (parsedQueue as Array<SyncAction>) : [];
  } catch {
    return [];
  }
}

function writeQueue(queue: Array<SyncAction>): void {
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
}

export function addToOfflineQueue(
  method: SyncAction["method"],
  endpoint: string,
  payload?: any,
): SyncAction {
  const queue = readQueue();
  const action: SyncAction = {
    id: crypto.randomUUID(),
    method,
    endpoint,
    payload,
  };

  queue.push(action);
  writeQueue(queue);

  return action;
}

export function getOfflineQueue(): Array<SyncAction> {
  return readQueue();
}

export function clearOfflineQueue(): void {
  localStorage.removeItem(OFFLINE_QUEUE_KEY);
}
