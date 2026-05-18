import { useEffect, useState } from 'react';
import {
  fetchObservationList,
  fetchLogs,
  resolveObservation,
  type ObservationEntry,
  type ActionLogEntry,
} from '@/api/services/adminApi';

export type Tab = 'flagged' | 'logs';

const PAGE_SIZE = 50;

function toErrorMessage(e: unknown, fallback: string): string {
  if (e instanceof Error && e.message.includes('403')) return 'Access denied. Admin role required.';
  return fallback;
}

export function useAdminPage() {
  const [tab, setTab] = useState<Tab>('flagged');
  const [observations, setObservations] = useState<ObservationEntry[]>([]);
  const [logs, setLogs] = useState<ActionLogEntry[]>([]);
  const [logUserFilter, setLogUserFilter] = useState('');
  const [logPage, setLogPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tab === 'flagged') loadObservations();
    else loadLogs(logUserFilter.trim() || undefined, 0);
  }, [tab]);

  async function loadObservations() {
    setLoading(true);
    setError(null);
    try {
      setObservations(await fetchObservationList());
    } catch (e) {
      setError(toErrorMessage(e, 'Failed to load flagged users.'));
    } finally {
      setLoading(false);
    }
  }

  async function loadLogs(userId?: string, page = 0) {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchLogs(userId, page, PAGE_SIZE);
      setLogs(results);
      setLogPage(page);
      setHasNextPage(results.length === PAGE_SIZE);
    } catch (e) {
      setError(toErrorMessage(e, 'Failed to load action logs.'));
    } finally {
      setLoading(false);
    }
  }

  async function handleResolve(userId: string) {
    try {
      await resolveObservation(userId);
      await loadObservations();
    } catch (e) {
      setError(toErrorMessage(e, 'Failed to resolve observation.'));
    }
  }

  function handleLogFilter(e: React.FormEvent) {
    e.preventDefault();
    loadLogs(logUserFilter.trim() || undefined, 0);
  }

  return {
    tab,
    setTab,
    observations,
    logs,
    logUserFilter,
    setLogUserFilter,
    logPage,
    hasNextPage,
    loading,
    error,
    loadLogs,
    handleResolve,
    handleLogFilter,
    isFiltered: logUserFilter.trim().length > 0,
  };
}
