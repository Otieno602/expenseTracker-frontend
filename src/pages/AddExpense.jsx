import { FiArrowLeft, FiEye } from "react-icons/fi";
import ExpenseForm from "../components/expenses/ExpenseForm";

const AddExpense = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f6f4ef] text-[#242321]">
      <main className="mx-auto min-h-screen w-full max-w-5xl min-w-0 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <header className="mx-auto mb-8 flex max-w-2xl items-center gap-4 sm:mb-10">
          <button
            type="button"
            aria-label="Go back"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e7e2d8] bg-white text-[#242321] shadow-sm transition hover:bg-[#faf9f6] active:scale-95"
          >
            <FiArrowLeft size={19} />
          </button>

          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <FiEye size={14} className="text-[#b8873d]" />

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b867c]">
                Moneye
              </p>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-[#242321] sm:text-3xl">
              Add expense
            </h1>
          </div>
        </header>

        <section className="mx-auto w-full min-w-0 max-w-2xl">
          <div className="mb-6">
            <p className="text-sm leading-6 text-[#777269]">
              Keep an eye on where your money goes.
            </p>
          </div>

          <div className="min-w-0 max-w-full rounded-[28px] border border-[#e7e2d8] bg-[#fbfaf7] p-4 shadow-[0_12px_40px_rgba(36,35,33,0.05)] sm:p-7 md:p-8">
            <ExpenseForm />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AddExpense;