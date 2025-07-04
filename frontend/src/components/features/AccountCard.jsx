import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Wallet,
  CreditCard,
  Building2,
  Smartphone,
  Banknote,
  PiggyBank,
  CircleDollarSign,
} from "lucide-react";
import React, { useState } from "react";
import { deleteAccount } from "../../services/api";
import toast from "react-hot-toast";

const iconMap = {
  wallet: Wallet,
  card: CreditCard,
  gcash: "image.png",
  maya: "paymaya.jpg",
  bdo: "bdo.png",
  bpi: "bpi.png",
  unionbank: Building2,
  metrobank: "metrobank.jpg",
  landbank: Building2,
  pnb: Building2,
  seabank: Smartphone,
  cash: Banknote,
  savings: PiggyBank,
  other: CircleDollarSign,
};

const AccountCard = ({ account }) => {
  const formatter = new Intl.NumberFormat("en-US");
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setisEditOpen] = useState(false);
  const { mutate: deleteMutation, isLoading } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["transactions"]);
      toast.success(data?.message);
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  if (isLoading)
    return <div className="spinner fixed inset-0 flex items-center justify-center">Loading...</div>;

  return (
    <div className="hover:scale-[1.02] transition-all duration-300 relative">
      {isEditOpen && (
        <div className="absolute bg-base-100 p-2 rounded-lg shadow-xl border border-gray-200 h-full min-w-full flex-col items-center text-center justify-center z-50">
          <h3 className="font-semibold mb-4 text-center">Edit {account.name}</h3>
          <div className="flex gap-3">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Account name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={account.name}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial Balance
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                defaultValue={account.initialBalance}
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setisEditOpen(false)}
              className="px-4 py-2 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors btn-xs flex items-center"
            >
              Cancel
            </button>
            <button className="px-4 py-2  font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors btn-xs flex items-center">
              Save
            </button>
          </div>
        </div>
      )}

      <div className="card bg-base-100/50 border-2 border-dashed border-base-content/20 hover:border-primary hover:bg-primary/5 transition-all duration-300 group relative">
        <div className="card-body p-4 flex flex-col items-center justify-center">
          <div
            className={`w-12 h-12 rounded-full border-2 border-dashed border-base-content/20 group-hover:border-primary flex items-center justify-center mb-3 transition-colors bg-base-200 overflow-auto`}
          >
            {(() => {
              const iconId = account.icon || "cash";
              const IconComponent = iconMap[iconId];

              if (typeof IconComponent === "string") {
                return (
                  <img
                    src={`/icons/${IconComponent}`}
                    alt={account.name}
                    className="w-6 h-6 object-contain scale-150 rounded-full"
                  />
                );
              }

              return (
                <IconComponent className="w-6 h-6 text-base-content/40 group-hover:text-primary transition-colors" />
              );
            })()}
          </div>
          <h3 className="font-semibold text-base-content/60 group-hover:text-primary transition-colors">
            {account.name}
          </h3>
          <p className="text-2xl text-green-500 text-center mt-1">
            ₱
            {formatter.format(
              account.transactions.length === 0 ? account.initialBalance : account.balance
            )}
          </p>
          <p className="text-xs text-base-content/50 mt-1">
            Initial Balance:{" "}
            <span className="font-semibold text-base-content/70">
              ₱{formatter.format(account.initialBalance)}
            </span>
          </p>
        </div>
        <div className="absolute top-0 right-0 m-2">
          <button className="btn btn-ghost btn-sm text-lg" onClick={() => setIsOpen(!isOpen)}>
            ...
          </button>

          {isOpen && (
            <div
              className={`absolute right-0 mt-1 w-16 bg-transparent rounded-md shadow-lg z-10 transition-all duration-200 ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <button
                className="w-full px-4 py-2 rounded-md text-sm text-red-600 hover:bg-transparent/20"
                onClick={() => deleteMutation(account.name)}
              >
                Delete
              </button>
              <button
                className="w-full px-4 py-2 rounded-md text-sm hover:bg-transparent/20"
                onClick={() => setisEditOpen(true)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
