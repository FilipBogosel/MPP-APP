export const cls = {
  // Inputs
  input: 'block w-full rounded-lg border border-gray-300 py-2.5 pl-10 text-sm text-gray-700 outline-none transition-colors focus:border-indigo-500 focus:ring-indigo-500',
  inputDark: 'block w-full rounded-lg border border-slate-600 bg-slate-800/50 py-2.5 pl-10 pr-10 text-sm text-white outline-none transition-colors',
  inputEditingLight: 'block w-full rounded-lg border-2 border-indigo-500 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition-colors',
  inputEditingDark: 'block w-full rounded-lg border-2 border-indigo-400 bg-slate-700 py-2.5 pl-10 pr-10 text-sm text-white outline-none transition-colors',
  label: 'block text-sm font-medium text-gray-700',
  labelSmallCaps: 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-500',
  labelSmallCapsDark: 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400',
  textarea: 'block w-full resize-y rounded-lg border border-gray-300 py-2.5 pl-10 text-sm outline-none transition-colors focus:border-indigo-500 focus:ring-indigo-500',

  // Buttons
  btnPrimary: 'inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  btnDanger: 'inline-flex items-center justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
  btnSuccess: 'inline-flex items-center justify-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
  btnDisabled: 'inline-flex items-center justify-center rounded-lg border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-white shadow-sm cursor-not-allowed',
  btnOutline: 'inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
  btnWide: 'flex w-full justify-center rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors',
  inputLightReadOnly: 'block w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-10 text-sm text-gray-900 outline-none transition-colors',

  // Cards and surfaces
  card: 'rounded-xl border border-gray-200 bg-white shadow-sm',
  cardSubtle: 'rounded-xl border border-gray-100 bg-white shadow-sm',
  cardPadded: 'rounded-xl border border-gray-200 bg-white p-6 shadow-sm',
  iconBox: 'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600',

  // Layout
  page: 'flex-1 bg-[#f4f6f8]',
  pageShell: 'mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8',
  sectionTitle: 'mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-600',
  pageTitle: 'text-2xl font-bold text-gray-900',
  pageSubtitle: 'mt-2 text-sm text-gray-600',
  backLink: 'mb-4 inline-flex items-center text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700',

  // Nav links
  navLinkActive: 'inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900 transition-colors',
  navLinkInactive: 'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700',
  mobileNavLinkActive: 'block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700',
  mobileNavLinkInactive: 'block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',

  // Table
  th: 'px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500',
  td: 'whitespace-nowrap px-6 py-4',
} as const;
