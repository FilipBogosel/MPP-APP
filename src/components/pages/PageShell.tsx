import type { ReactNode } from 'react';

type PageShellProps = {
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function PageShell({ title, description, actions, children }: PageShellProps) {
  return (
    <section className="flex-1 bg-[#f4f6f8] p-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          {actions ? <div className="flex gap-2">{actions}</div> : null}
        </header>
        {children}
      </div>
    </section>
  );
}