import { FiAlertTriangle, FiLoader, FiTrash2, FiX } from "react-icons/fi";

const DeleteExpenseModal = ({
  expense,
  onClose,
  onConfirm,
  isDeleting,
  error,
  formatAmount,
}) => {
  if (!expense) return null;

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-[#242321]/50 p-4 backdrop-blur-sm"
      onClick={() => {
        if (!isDeleting) onClose();
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-expense-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-md rounded-[28px] border border-[#e7e2d8] bg-[#fbfaf7] p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <FiAlertTriangle size={23} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close confirmation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7e2d8] bg-white text-[#777269] transition hover:bg-[#f6f4ef] disabled:opacity-50"
          >
            <FiX size={19} />
          </button>
        </div>

        <h2
          id="delete-expense-title"
          className="text-xl font-semibold text-[#242321]"
        >
          Delete this transaction?
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#777269]">
          You're about to permanently delete this spending record. This action
          cannot be undone.
        </p>

        <div className="my-6 rounded-2xl border border-[#e7e2d8] bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="font-semibold text-[#242321]">
                {expense.category}
              </p>
              <p className="mt-1 text-sm text-[#8b867c]">
                {expense.type}
              </p>
            </div>

            <p className="shrink-0 font-semibold text-[#242321]">
              KSh {formatAmount(expense.amount)}
            </p>
          </div>

          {expense.note && (
            <p className="mt-3 border-t border-[#eeeae2] pt-3 text-sm text-[#777269]">
              {expense.note}
            </p>
          )}
        </div>

        {error && (
          <p className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-xl border border-[#e7e2d8] bg-white px-4 py-3 text-sm font-semibold text-[#5f5b54] transition hover:bg-[#f6f4ef] disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <FiLoader className="animate-spin" size={16} />
                Deleting...
              </>
            ) : (
              <>
                <FiTrash2 size={16} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpenseModal;