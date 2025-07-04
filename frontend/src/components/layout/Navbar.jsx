import { FaMoneyBillTransfer } from "react-icons/fa6";
import { LogOut } from "lucide-react";
import useLogOut from "../../hooks/useLogout";
import useAuthUser from "../../hooks/useAuthUser";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Navbar = () => {
  const { isLoading, error, logoutMutation } = useLogOut();
  const { authUser } = useAuthUser();

  if (error) toast.error(error.message);

  return (
    <div className="bg-base-300 h-16 w-full flex justify-between items-center px-6 shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
        <FaMoneyBillTransfer className="text-4xl text-lime-400" />
        <p className="text-2xl font-bold font-title text-primary">FinTrackPH</p>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4 text-sm">
        <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
          Overview
        </Link>
        <Link to="/transactions" className="btn btn-ghost btn-sm rounded-btn">
          Transactions
        </Link>
        <Link to="/budgets" className="btn btn-ghost btn-sm rounded-btn">
          Budgets
        </Link>

        {/* Auth Actions */}
        {authUser && (
          <button
            onClick={logoutMutation}
            className="btn btn-outline btn-error btn-sm flex items-center gap-2"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <>
                <LogOut size={18} />
                Logout
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
