import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import CategorySelector from "./CategorySelector";
import SpendingTypeSelector from "./SpendingTypeSelector";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "",
    note: "",
  });

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const expense = {
      amount: Number(formData.amount),
      category: formData.category,
      type: formData.type,
      note: formData.note.trim(),
      date: new Date(),
    };

    console.log("Expense:", expense);
  };

  const isFormValid =
    formData.amount && formData.category && formData.type;

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Amount */}
      <section>
        <label
          htmlFor="amount"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Amount
        </label>

        <div className="flex items-center rounded-2xl bg-white px-4 py-4 shadow-sm ring-1 ring-gray-100">
          <span className="mr-3 text-lg font-semibold text-gray-500">
            KSh
          </span>

          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            inputMode="decimal"
            placeholder="0"
            value={formData.amount}
            onChange={(event) =>
              handleChange("amount", event.target.value)
            }
            className="w-full bg-transparent text-3xl font-bold outline-none placeholder:text-gray-300"
          />
        </div>
      </section>

      {/* Category */}
      <CategorySelector
        value={formData.category}
        onChange={(value) => handleChange("category", value)}
      />

      {/* Spending Type */}
      <SpendingTypeSelector
        value={formData.type}
        onChange={(value) => handleChange("type", value)}
      />

      {/* Note */}
      <section>
        <label
          htmlFor="note"
          className="mb-2 block text-sm font-medium text-gray-600"
        >
          Note{" "}
          <span className="font-normal text-gray-400">
            (optional)
          </span>
        </label>

        <textarea
          id="note"
          rows="3"
          placeholder="What was this for?"
          value={formData.note}
          onChange={(event) =>
            handleChange("note", event.target.value)
          }
          className="w-full resize-none rounded-2xl bg-white px-4 py-4 text-sm outline-none ring-1 ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-gray-900"
        />
      </section>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isFormValid}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 px-5 py-4 font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <FiCheck size={20} />
        Save Expense
      </button>
    </form>
  );
};

export default ExpenseForm;