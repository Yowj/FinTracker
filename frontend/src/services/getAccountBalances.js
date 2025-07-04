
export function getAccountBalances(accounts) {
  if (!Array.isArray(accounts)) return [];
  return accounts.map(acc => ({
    name: acc.name || acc.bankName || 'Account',
    balance: acc.balance || 0,
  }));
}
