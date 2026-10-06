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
    Number(formData.amount) > 0 &&
    formData.category &&
    formData.type;

  return (
    <form onSubmit={handleSubmit} className="w-full min-w-0 space-y-7">
      {/* Amount */}
      <section>
        <label
          htmlFor="amount"
          className="mb-3 block text-sm font-medium text-[#5f5b54]"
        >
          How much did you spend?
        </label>

        <div className="flex w-full min-w-0 items-center overflow-hidden rounded-2xl border border-[#e7e2d8] bg-white px-4 py-4 transition focus-within:border-[#b8873d] focus-within:ring-4 focus-within:ring-[#b8873d]/10 sm:px-5 sm:py-5">
          <span className="mr-3 text-base font-semibold text-[#8b867c] sm:text-lg">
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
            className="min-w-0 flex-1 bg-transparent text-3xl font-semibold tracking-tight text-[#242321] outline-none placeholder:text-[#d8d3c9] sm:text-4xl"
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
          className="mb-3 block text-sm font-medium text-[#5f5b54]"
        >
          Note{" "}
          <span className="font-normal text-[#a29d94]">
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
          className="w-full resize-none rounded-2xl border border-[#e7e2d8] bg-white px-4 py-4 text-sm text-[#242321] outline-none transition placeholder:text-[#aaa49a] focus:border-[#b8873d] focus:ring-4 focus:ring-[#b8873d]/10"
        />
      </section>

      {/* Save */}
      <button
        type="submit"
        disabled={!isFormValid}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#242321] px-5 py-4 font-semibold text-white shadow-sm transition hover:bg-[#34322f] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#d7d2c8] disabled:text-[#9a958b] disabled:shadow-none sm:py-4.5"
      >
        <FiCheck size={19} />
        Save expense
      </button>
    </form>
  );
};

export default ExpenseForm;