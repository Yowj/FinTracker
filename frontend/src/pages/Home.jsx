import AddExpense from "../components/forms/AddExpense";
import AddIncome from "../components/forms/AddIncome";
import TransactionTable from "../components/features/TransactionTable";
import { Plus, Wallet, CreditCard, PiggyBank, Building2 } from "lucide-react";
import { useState, useMemo } from "react";
import AddAccountModal from "../components/forms/AddAccountModal";
import AccountCard from "../components/features/AccountCard";
import useGetAllTransaction from "../hooks/useGetAllTransaction";
import useAuthUser from "../hooks/useAuthUser";
import dayjs from "dayjs";
import AccountDonutChart from "../components/features/AccountDonutChart";
import { getAccountBalances } from "../services/getAccountBalances";

const Home = () => {
  const { authUser: user } = useAuthUser();
  const [modal, setModal] = useState(false);
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));

  const formatter = new Intl.NumberFormat("en-US");

  const { transactions, isLoading } = useGetAllTransaction(user?._id);

  // Generate month options from first transaction until current month
  const monthOptions = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    // Get all unique months from transactions
    const uniqueMonths = new Set();
    transactions.forEach((transaction) => {
      const monthYear = dayjs(transaction.date).format("YYYY-MM");
      uniqueMonths.add(monthYear);
    });

    // Convert to array and sort (newest first)
    return Array.from(uniqueMonths)
      .sort((a, b) => b.localeCompare(a))
      .map((monthYear) => ({
        value: monthYear,
        label: dayjs(monthYear).format("MMMM YYYY"),
      }));
  }, [transactions]);

  // Filter transactions by selected month
  const filteredTransactions = useMemo(() => {
    if (!month) return transactions;
    return transactions?.filter((transaction) => {
      const transactionMonth = dayjs(transaction.date).format("YYYY-MM");
      return transactionMonth === month;
    });
  }, [transactions, month]);

  const expenses = filteredTransactions?.filter((transaction) => transaction.type === "expense");
  const totalExpenses = expenses?.reduce((acc, transaction) => acc + transaction.amount, 0);

  const handleMonthChange = (selectedMonth) => {
    setMonth(selectedMonth);
  };

  if (isLoading)
    return <div className="spinner fixed inset-0 flex items-center justify-center">Loading...</div>;

  return (
    <div>
      <div className="p-4 sm:p-6 lg:p-8 container mx-auto space-y-8">
        <div className="flex gap-3 justify-end ">
          <AddIncome />
          <AddExpense />
          <AddAccountModal open={modal} onClose={() => setModal(false)} />
        </div>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-base-300">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Overview
            </h1>
            <p className="text-base-content/60 mt-1">Manage your finances with ease</p>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Total Capital Card */}
          <div className="group hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-2xl font-bold mb-3 text-base-content/80">Total Capital</h2>
            <div className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <p className="text-sm text-base-content/60 uppercase tracking-wider">
                Current Balance
              </p>
              <p className="text-4xl font-black text-success mt-2">
                ₱{formatter.format(user.capital)}
              </p>
            </div>
          </div>

          {/* Total Expenses Card */}
          <div className="group hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl font-bold mb-3 text-base-content/80">
                Total Expenses - {month ? dayjs(month).format("MMMM YYYY") : "All Time"}
              </h2>
              <div className="dropdown dropdown-hover dropdown-end">
                <button className="btn btn-primary btn-xs rounded-lg" role="button">
                  Filter by month ⮟
                </button>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-32 p-1 shadow max-h-60 overflow-y-auto text-center"
                >
                  {monthOptions.length === 0 ? (
                    <div>Empty</div>
                  ) : (
                    monthOptions.map((option) => (
                      <li key={option.value}>
                        <button
                          onClick={() => handleMonthChange(option.value)}
                          className={`${
                            month === option.value ? "bg-primary text-primary-content" : ""
                          }`}
                        >
                          {option.label}
                        </button>
                      </li>
                    ))
                  )}
                  <li>
                    <button onClick={() => handleMonthChange(null)}>All Expenses</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-gradient-to-br from-error/10 to-error/5 border border-error/20 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <p className="text-sm text-base-content/60 uppercase tracking-wider">
                Monthly Spending
              </p>
              <p className="text-4xl font-black text-error mt-2">
                ₱{formatter.format(totalExpenses)}
              </p>
            </div>
          </div>
        </div>
        {/* Capital Distribution Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-base-content/80">Capital Distribution</h2>
            <p className="text-sm text-base-content/60">Track where your money is stored</p>
          </div>
          <div className="bg-base-200/50 backdrop-blur-sm border border-base-300 p-8 rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Sample Account Cards */}
              {user.accounts.map((account, index) => (
                <AccountCard account={account} key={index} />
              ))}

              {/* Add New Account Button */}
              <button
                className="card bg-base-100/50 border-2 border-dashed border-base-content/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                onClick={() => setModal(true)}
              >
                <div className="card-body p-4 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-dashed border-base-content/20 group-hover:border-primary flex items-center justify-center mb-3 transition-colors">
                    <Plus className="w-6 h-6 text-base-content/40 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-base-content/60 group-hover:text-primary transition-colors">
                    Add Account
                  </h3>
                  <p className="text-xs text-base-content/40 text-center mt-1">
                    Track another source
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* Transactions Section */}
        <div className="bg-base-100/80 backdrop-blur-sm rounded-2xl shadow-xl border border-base-300 px-6 py-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">20 Most Recent Transactions</p>
          </div>
          <TransactionTable sliced={true} />
        </div>

        {/* Charts */}
        <div className="bg-base-200/50 backdrop-blur-sm border border-base-300 p-8 rounded-2xl shadow-lg">
          <div className="mb-8">
            <AccountDonutChart accounts={getAccountBalances(user.accounts)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
