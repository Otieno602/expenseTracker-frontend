
import { useEffect, useState } from "react";
import { FiCheck, FiLoader, FiX } from "react-icons/fi";
import CategorySelector from "./CategorySelector";
import SpendingTypeSelector from "./SpendingTypeSelector";

const EditExpenseModal = ({
  expense,
  onClose,
  onSave,
  isSaving,
  error,
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "",
    note: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        amount: String(expense.amount),
        category: expense.category,
        type: expense.type,
        note: expense.note || "",
      });
    }
  }, [expense]);

  if (!expense) return null;

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const isFormValid =
    Number(formData.amount) > 0 &&
    Number.isFinite(Number(formData.amount)) &&
    Boolean(formData.category) &&
    Boolean(formData.type);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isFormValid || isSaving) return;

    onSave({
      amount: Number(formData.amount),
      category: formData.category,
      type: formData.type,
      note: formData.note.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center bg-[#242321]/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-expense-title"
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[28px] border border-[#e7e2d8] bg-[#fbfaf7] p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-7 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b8873d]">
              Update transaction
            </p>
            <h2
              id="edit-expense-title"
              className="mt-1 text-xl font-semibold text-[#242321]"
            >
              Edit expense
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close edit form"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7e2d8] bg-white text-[#777269] transition hover:bg-[#f6f4ef] disabled:opacity-50"
          >
            <FiX size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          <section>
            <label
              htmlFor="edit-amount"
              className="mb-3 block text-sm font-medium text-[#5f5b54]"
            >
              How much did you spend?
            </label>

            <div className="flex items-center overflow-hidden rounded-2xl border border-[#e7e2d8] bg-white px-4 py-4 transition focus-within:border-[#b8873d] focus-within:ring-4 focus-within:ring-[#b8873d]/10 sm:px-5 sm:py-5">
              <span className="mr-3 shrink-0 font-semibold text-[#8b867c]">
                KSh
              </span>

              <input
                id="edit-amount"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                value={formData.amount}
                onChange={(event) =>
                  handleChange("amount", event.target.value)
                }
                className="min-w-0 flex-1 bg-transparent text-3xl font-semibold tracking-tight text-[#242321] outline-none"
                required
              />
            </div>
          </section>

          <CategorySelector
            value={formData.category}
            onChange={(value) => handleChange("category", value)}
          />

          <SpendingTypeSelector
            value={formData.type}
            onChange={(value) => handleChange("type", value)}
          />

          <section>
            <label
              htmlFor="edit-note"
              className="mb-3 block text-sm font-medium text-[#5f5b54]"
            >
              Note{" "}
              <span className="font-normal text-[#a29d94]">
                (optional)
              </span>
            </label>

            <textarea
              id="edit-note"
              rows="3"
              value={formData.note}
              onChange={(event) =>
                handleChange("note", event.target.value)
              }
              placeholder="What was this for?"
              className="w-full resize-none rounded-2xl border border-[#e7e2d8] bg-white px-4 py-4 text-sm text-[#242321] outline-none transition placeholder:text-[#aaa49a] focus:border-[#b8873d] focus:ring-4 focus:ring-[#b8873d]/10"
            />
          </section>

          {error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isSaving}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#242321] px-5 py-4 font-semibold text-white shadow-sm transition hover:bg-[#34322f] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#d7d2c8] disabled:text-[#9a958b] disabled:shadow-none"
          >
            {isSaving ? (
              <>
                <FiLoader className="animate-spin" size={18} />
                Saving changes...
              </>
            ) : (
              <>
                <FiCheck size={19} />
                Save changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseModal;
