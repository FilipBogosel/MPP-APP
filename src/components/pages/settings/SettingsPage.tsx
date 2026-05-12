import { logout } from '@/api/services/authApi';
import { cls } from '@/styles/classes';

export function SettingsPage() {
  return (
    <div className={cls.page}>
      <div className={cls.pageShell}>
        <header className="mb-8">
          <h1 className={cls.pageTitle}>Settings</h1>
          <p className={cls.pageSubtitle}>Manage your account and session preferences.</p>
        </header>

        <div className={cls.cardPadded}>
          <p className="text-sm text-gray-600">
            Logging out will end your current session on this device.
          </p>
          <div className="mt-6">
            <button type="button" className={cls.btnDanger} onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
