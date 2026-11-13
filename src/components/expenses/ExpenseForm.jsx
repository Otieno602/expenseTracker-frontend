import { useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CategorySelector from "./CategorySelector";
import SpendingTypeSelector from "./SpendingTypeSelector";

import API_URL from "../../services/api";

const ExpenseForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "",
    note: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(formData.amount),
          category: formData.category,
          type: formData.type,
          note: formData.note.trim(),
          date: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save expense.");
      }

      navigate("/transactions");
    } catch (error) {
      console.error("Save expense error:", error);
      setError("Couldn't save this expense. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const isFormValid =
    Number(formData.amount) > 0 &&
    Boolean(formData.category) &&
    Boolean(formData.type);

  return (
    <form onSubmit={handleSubmit} className="w-full min-w-0 space-y-7">
      <section>
        <label
          htmlFor="amount"
          className="mb-3 block text-sm font-medium text-[#5f5b54]"
        >
          How much did you spend?
        </label>

        <div className="flex w-full min-w-0 items-center overflow-hidden rounded-2xl border border-[#e7e2d8] bg-white px-4 py-4 transition focus-within:border-[#b8873d] focus-within:ring-4 focus-within:ring-[#b8873d]/10 sm:px-5 sm:py-5">
          <span className="mr-3 shrink-0 text-base font-semibold text-[#8b867c] sm:text-lg">
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
            onChange={(event) => handleChange("amount", event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-3xl font-semibold tracking-tight text-[#242321] outline-none placeholder:text-[#d8d3c9] sm:text-4xl"
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
          htmlFor="note"
          className="mb-3 block text-sm font-medium text-[#5f5b54]"
        >
          Note <span className="font-normal text-[#a29d94]">(optional)</span>
        </label>

        <textarea
          id="note"
          rows="3"
          placeholder="What was this for?"
          value={formData.note}
          onChange={(event) => handleChange("note", event.target.value)}
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
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#242321] px-5 py-4 font-semibold text-white shadow-sm transition hover:bg-[#34322f] active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-[#d7d2c8] disabled:text-[#9a958b] disabled:shadow-none sm:py-4.5"
      >
        {isSaving ? (
          <>
            <FiLoader className="animate-spin" size={18} />
            Saving...
          </>
        ) : (
          <>
            <FiCheck size={19} />
            Save expense
          </>
        )}
      </button>
    </form>
  );
};

export default ExpenseForm;
