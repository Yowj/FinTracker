import TransactionTable from "../components/features/TransactionTable";

const Transactions = () => {
  return (
    <div className="w-full px-36 pt-5">
      <TransactionTable sliced={false}/>
    </div>
  );
};

export default Transactions;
