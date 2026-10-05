import { FiArrowLeft } from "react-icons/fi";
import ExpenseForm from "../components/expenses/ExpenseForm";

const AddExpense = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto w-full max-w-md px-5 py-6">
        <header className="mb-8 flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-gray-100"
          >
            <FiArrowLeft size={20} />
          </button>

          <div>
            <p className="text-sm text-gray-500">Personal Money Tracker</p>
            <h1 className="text-2xl font-bold tracking-tight">
              Add Expense
            </h1>
          </div>
        </header>

        <ExpenseForm />
      </main>
    </div>
  );
};

export default AddExpense;