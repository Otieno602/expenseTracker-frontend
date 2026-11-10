import { FiTrash2, FiX } from "react-icons/fi";

const ExpenseDetailsModal = ({
  expense,
  onClose,
  onEdit,
  onDelete,
  formatAmount,
  formatDateTime,
}) => {
  if (!expense) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#242321]/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="expense-detail-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-[28px] border border-[#e7e2d8] bg-[#fbfaf7] p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b8873d]">
              Transaction details
            </p>

            <h2
              id="expense-detail-title"
              className="mt-1 text-xl font-semibold text-[#242321]"
            >
              Expense information
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7e2d8] bg-white text-[#777269] transition hover:bg-[#f6f4ef]"
          >
            <FiX size={19} />
          </button>
        </div>

        <div className="mb-6 rounded-2xl bg-[#f3efe6] p-5">
          <p className="text-sm text-[#8b867c]">Amount spent</p>

          <p className="mt-2 text-3xl font-semibold tracking-tight text-[#242321]">
            KSh {formatAmount(expense.amount)}
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#a29d94]">
              Category
            </p>
            <p className="mt-1 font-semibold text-[#242321]">
              {expense.category}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#a29d94]">
              Spending type
            </p>

            <span className="mt-2 inline-flex rounded-full bg-[#f0e8da] px-3 py-1.5 text-sm font-semibold text-[#8b6532]">
              {expense.type}
            </span>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#a29d94]">
              Note
            </p>
            <p className="mt-1 text-sm leading-6 text-[#5f5b54]">
              {expense.note || "No note added"}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#a29d94]">
              Date and time
            </p>
            <p className="mt-1 text-sm text-[#5f5b54]">
              {formatDateTime(expense.date)}
            </p>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-2 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            <FiTrash2 size={15} />
            Delete
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl border border-[#e7e2d8] bg-white px-2 py-3 text-sm font-semibold text-[#242321] transition hover:bg-[#f6f4ef]"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#242321] px-2 py-3 text-sm font-semibold text-white transition hover:bg-[#34322f]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetailsModal;
