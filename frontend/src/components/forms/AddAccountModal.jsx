import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { addAccount } from "../../services/api";
import {
  Wallet,
  CreditCard,
  Building2,
  Smartphone,
  DollarSign,
  Banknote,
  PiggyBank,
  CircleDollarSign,
} from "lucide-react";
import toast from "react-hot-toast";

const AddAccountModal = ({ open, onClose }) => {
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [formError, setFormError] = useState("");

  const queryClient = useQueryClient();
  const { mutate: addAccountMutation, isPending } = useMutation({
    mutationFn: addAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Account added successfully!");
    },
    onError: (error) => toast.error(error?.response.data.message) || "An error occurred."});


  // Popular PH payment accounts with their icons and colors
  const paymentIcons = [
    {
      id: "gcash",
      name: "GCash",
      isImage: true,
      imageSrc: "/icons/image.png",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      id: "maya",
      name: "Maya",
      isImage: true,
      imageSrc: "/icons/paymaya.jpg",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      id: "bdo",
      name: "BDO",
      isImage: true,
      imageSrc: "/icons/bdo.png",
      color: "text-blue-700",
      bgColor: "bg-blue-100",
    },
    {
      id: "bpi",
      name: "BPI",
      isImage: true,
      imageSrc: "/icons/bpi.png",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: "unionbank",
      name: "UnionBank",
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: "metrobank",
      name: "Metrobank",
      isImage: true,
      imageSrc: "/icons/metrobank.jpg",
      color: "text-indigo-700",
      bgColor: "bg-indigo-100",
    },
    {
      id: "landbank",
      name: "LandBank",
      icon: Building2,
      color: "text-green-700",
      bgColor: "bg-green-100",
    },
    {
      id: "pnb",
      name: "PNB",
      icon: Building2,
      color: "text-red-700",
      bgColor: "bg-red-100",
    },
    {
      id: "seabank",
      name: "SeaBank",
      icon: Smartphone,
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
    {
      id: "cash",
      name: "Cash",
      icon: Banknote,
      color: "text-gray-600",
      bgColor: "bg-gray-100",
    },
    {
      id: "savings",
      name: "Savings",
      icon: PiggyBank,
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
    {
      id: "wallet",
      name: "Wallet",
      icon: Wallet,
      color: "text-gray-700",
      bgColor: "bg-gray-100",
    },
    {
      id: "card",
      name: "Credit Card",
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      id: "other",
      name: "Other",
      icon: CircleDollarSign,
      color: "text-gray-500",
      bgColor: "bg-gray-100",
    },
  ];

  if (!open) return null;

  const handleSubmit = () => {
    if (!accountName.trim() || !balance || isNaN(balance)) {
      setFormError("Please enter a valid account name and numeric balance.");
      return;
    }
    addAccountMutation({
      name: accountName,
      initialBalance: parseFloat(balance),
      icon: selectedIcon,
    });
    handleClose();
  };

  const getSelectedIconData = () => {
    const found = paymentIcons.find((icon) => icon.id === selectedIcon);
    return found || paymentIcons.find((icon) => icon.id === "wallet") || paymentIcons[0];
  };

  // Reusable icon rendering function
  const renderIcon = (iconData, size = "w-5 h-5") => {
    if (!iconData) return null;

    if (iconData.isImage) {
      return (
        <img src={iconData.imageSrc} alt={iconData.name} className={`${size} object-contain`} />
      );
    } else if (iconData.icon) {
      const IconComponent = iconData.icon;
      return <IconComponent className={`${size} ${iconData.color}`} />;
    }
    return null;
  };

  const handleClose = () => {
    setBalance("");
    setAccountName("");
    setSelectedIcon("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-base-100 rounded-2xl shadow-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto border border-base-300 relative">
        <button
          className="absolute top-3 right-3 text-base-content/60 hover:text-error text-xl"
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-base-content/80">Add Account</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-base-content/70 mb-1">Account Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Example: Gcash"
              required
            />
          </div>
          <div>
            <label className="block text-base-content/70 mb-1">Balance</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="0.00"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-base-content/70 mb-2">Choose Icon</label>
            <div className="grid grid-cols-4 gap-2">
              {paymentIcons.map((item) => {
                const isSelected = selectedIcon === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedIcon(item.id)}
                    className={`
                      flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                      ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-base-300 hover:border-primary/50 hover:bg-base-200"
                      }
                    `}
                    title={item.name}
                  >
                    <div className={`${item.bgColor} p-2 rounded-lg mb-1`}>{renderIcon(item)}</div>
                    <span className="text-xs text-base-content/70 text-center">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-base-200 rounded-lg p-3 flex items-center space-x-3">
            <div className={`${getSelectedIconData().bgColor} p-2 rounded-lg`}>
              {renderIcon(getSelectedIconData(), "w-6 h-6")}
            </div>
            <div className="flex-1">
              <div className="font-medium text-base-content/80">
                {accountName || "Account Name"}
              </div>
              <div className="text-sm text-base-content/60">₱{balance || "0.00"}</div>
            </div>
          </div>

          {formError && <div className="text-error text-sm">{formError}</div>}

          <button
            onClick={handleSubmit}
            className="btn btn-primary w-full mt-2"
            disabled={isPending}
          >
            {isPending ? "Adding..." : "Add Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAccountModal;
