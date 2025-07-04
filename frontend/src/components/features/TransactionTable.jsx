import React, { useState } from "react";
import useGetAllTransaction from "../../hooks/useGetAllTransaction";
import useAuthUser from "../../hooks/useAuthUser";
import TransactionCard from "./TransactionCard";

export default function TransactionTable({ sliced }) {
  const { authUser: user } = useAuthUser();
  const { transactions, isLoading, error } = useGetAllTransaction(user?._id);
  const [filter, setFilter] = useState(null);
  let recentTransactions = [];
  // Check if user exists
  if (!user) {
    return (
      <div className="max-w-8xl mx-auto p-6">
        <div className="text-center py-8">Please log in to view transactions</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-8xl mx-auto p-6">
        <div className="text-center py-8">Loading transactions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-8xl mx-auto p-6">
        <div className="text-center py-8 text-red-500">
          Error: {error.message || "Failed to load transactions"}
        </div>
      </div>
    );
  }

  const categories = new Set();
  for (const transaction of transactions) {
    categories.add(transaction.category);
  }
  const categoriesArray = Array.from(categories);

  const sortedTransactions = [...(transactions || [])].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  if (filter) {
    recentTransactions = sortedTransactions.filter(
      (transaction) => transaction.category === filter
    );
  } else {
    sliced == true
      ? (recentTransactions = sortedTransactions.slice(0, 10))
      : (recentTransactions = sortedTransactions);
  }

  return (
    <div className="max-w-8xl mx-auto px-6 ">
      {/* Filter */}
      <div className="flex justify-end p-2">
        <div className="dropdown dropdown-hover">
          <label className="btn bg-black/20 text-white hover:bg-primary">
            Filter by category <span className="ml-2 text-xs">▼</span>
          </label>
          <ul className="dropdown-content z-[1] menu p-2 shadow bg-black/90 rounded-box w-52">
            {categoriesArray.map((category) => (
              <li key={category}>
                <a className="hover:bg-blue-900" onClick={() => setFilter(category)}>
                  {category}
                </a>
              </li>
            ))}
            <li>
              <a className="hover:bg-blue-900" onClick={() => setFilter(null)}>
                Reset Filter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg shadow-sm overflow-hidden bg-black/20">
        <div className="grid grid-cols-5 md:grid-cols-6 gap-0">
          {/* Header */}
          <div className="px-6 py-3 text-xs font-medium uppercase border-b border-gray-200">
            Date
          </div>
          <div className="px-6 py-3 text-xs text-center font-medium uppercase tracking-wide border-b border-gray-200">
            Category
          </div>
          <div className="px-6 py-3 text-xs text-center font-medium uppercase tracking-wide border-b border-gray-200 hidden md:block">
            Description
          </div>
          <div className="px-6 py-3 text-xs text-center font-medium uppercase tracking-wide border-b border-gray-200">
            Type
          </div>
          <div className="px-6 py-3 text-xs text-center font-medium uppercase tracking-wide border-b border-gray-200">
            Amount
          </div>
          <div className="px-6 py-3 uppercase tracking-wide border-b border-gray-200"></div>

          {/* Transaction Rows */}
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <TransactionCard key={transaction._id} transaction={transaction} />
            ))
          ) : (
            <div className="col-span-6 px-6 py-8 text-center text-gray-500">
              No transactions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
