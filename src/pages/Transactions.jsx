import { useEffect, useMemo, useState } from "react";
import { FiArrowLeft, FiPlus, FiSearch, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ExpenseDetailsModal from "../components/expenses/ExpenseDetailsModal";
import EditExpenseModal from "../components/expenses/EditExpenseModal";
import DeleteExpenseModal from "../components/expenses/DeleteExpenseModal";

const categories = [
  "Food",
  "Transport",
  "Bills",
  "Shopping",
  "Entertainment",
  "Health",
  "Education",
  "Business",
  "Technology",
  "Communication",
  "Family",
  "Personal",
  "Other",
];

const spendingTypes = ["All", "Need", "Want", "Growth", "Waste"];

const Transactions = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [selectedExpense, setSelectedExpense] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/expenses");

        if (!response.ok) {
          throw new Error("Failed to fetch expenses.");
        }

        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Fetch expenses error:", error);
        setError("Couldn't load your expenses.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return sortedExpenses.filter((expense) => {
      const matchesSearch =
        !query ||
        expense.category.toLowerCase().includes(query) ||
        expense.type.toLowerCase().includes(query) ||
        expense.note?.toLowerCase().includes(query);

      const matchesType = typeFilter === "All" || expense.type === typeFilter;

      const matchesCategory =
        categoryFilter === "All" || expense.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [sortedExpenses, searchQuery, typeFilter, categoryFilter]);

  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0,
    );
  }, [expenses]);

  const filteredTotal = useMemo(() => {
    return filteredExpenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0,
    );
  }, [filteredExpenses]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-KE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const hasActiveFilters =
    searchQuery || typeFilter !== "All" || categoryFilter !== "All";

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("All");
    setCategoryFilter("All");
  };

  const handleUpdateExpense = async (updatedData) => {
    if (!selectedExpense) return;

    setIsUpdating(true);
    setUpdateError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${selectedExpense.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update expense.");
      }

      setExpenses((previous) =>
        previous.map((expense) => (expense.id === data.id ? data : expense)),
      );

      setSelectedExpense(data);
      setIsEditing(false);
    } catch (error) {
      console.error("Update expense error:", error);
      setUpdateError(
        error.message || "Couldn't update this expense. Please try again.",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteExpense = async () => {
    if (!selectedExpense || isDeleting) return;

    setIsDeleting(true);
    setDeleteError("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/expenses/${selectedExpense.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete expense.");
      }

      setExpenses((previous) =>
        previous.filter((expense) => expense.id !== selectedExpense.id),
      );

      setIsDeleteConfirmationOpen(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error("Delete expense error:", error);

      setDeleteError(
        error.message || "Couldn't delete this expense. Please try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f6f4ef] text-[#242321]">
      <main className="mx-auto min-h-screen w-full max-w-4xl min-w-0 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <header className="mx-auto mb-8 flex max-w-3xl items-center justify-between gap-4 sm:mb-10">
          <div className="flex min-w-0 items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              aria-label="Go back"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e7e2d8] bg-white text-[#242321] shadow-sm transition hover:bg-[#faf9f6] active:scale-95"
            >
              <FiArrowLeft size={19} />
            </button>

            <div className="min-w-0">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#b8873d]">
                Moneye
              </p>

              <h1 className="truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                Transactions
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#242321] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#34322f] active:scale-[0.98]"
          >
            <FiPlus size={17} />

            <span className="hidden sm:inline">Add expense</span>
          </button>
        </header>

        <section className="mx-auto w-full max-w-3xl min-w-0">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Your spending</h2>

            <p className="mt-1 text-sm text-[#8b867c]">
              A record of where your money has gone.
            </p>
          </div>

          {!isLoading && !error && expenses.length > 0 && (
            <div className="mb-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-[#e7e2d8] bg-[#fbfaf7] p-4 sm:p-5">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8b867c]">
                  Total spent
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-tight text-[#242321] sm:text-3xl">
                  KSh {formatAmount(totalSpent)}
                </p>
              </div>

              <div className="rounded-2xl border border-[#e7e2d8] bg-[#fbfaf7] p-4 sm:p-5">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#8b867c]">
                  Transactions
                </p>

                <p className="mt-2 text-2xl font-semibold tracking-tight text-[#242321] sm:text-3xl">
                  {expenses.length}
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="rounded-2xl border border-[#e7e2d8] bg-[#fbfaf7] px-5 py-10 text-center">
              <p className="text-sm text-[#8b867c]">Loading your expenses...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-10 text-center">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {!isLoading && !error && expenses.length === 0 && (
            <div className="rounded-2xl border border-[#e7e2d8] bg-[#fbfaf7] px-6 py-12 text-center">
              <p className="text-lg font-semibold">No expenses yet</p>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#8b867c]">
                Start recording your spending and Moneye will begin showing you
                where your money goes.
              </p>

              <button
                type="button"
                onClick={() => navigate("/")}
                className="mt-6 rounded-xl bg-[#242321] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#34322f] active:scale-[0.98]"
              >
                Add your first expense
              </button>
            </div>
          )}

          {!isLoading && !error && expenses.length > 0 && (
            <div>
              {/* Search */}
              <div className="relative mb-4">
                <FiSearch
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8b867c]"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search your spending..."
                  className="w-full rounded-2xl border border-[#e7e2d8] bg-white py-4 pl-11 pr-11 text-sm text-[#242321] outline-none transition placeholder:text-[#aaa49a] focus:border-[#b8873d] focus:ring-4 focus:ring-[#b8873d]/10"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#8b867c] transition hover:bg-[#f6f4ef]"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>

              {/* Spending type filters */}
              <div className="mb-4 overflow-x-auto pb-2">
                <div className="flex w-max gap-2 pr-2">
                  {spendingTypes.map((type) => {
                    const isSelected = typeFilter === type;

                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTypeFilter(type)}
                        className={`shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition ${
                          isSelected
                            ? "bg-[#242321] text-white"
                            : "border border-[#e7e2d8] bg-white text-[#777269] hover:bg-[#faf9f6]"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category filter */}
              <div className="mb-5 flex items-center gap-3">
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  className="min-w-0 flex-1 rounded-xl border border-[#e7e2d8] bg-white px-4 py-3 text-sm text-[#5f5b54] outline-none transition focus:border-[#b8873d] focus:ring-4 focus:ring-[#b8873d]/10"
                >
                  <option value="All">All categories</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="shrink-0 text-sm font-medium text-[#b8873d] transition hover:text-[#8b6532]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Result information */}
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-[#5f5b54]">
                  {hasActiveFilters
                    ? `${filteredExpenses.length} result${
                        filteredExpenses.length === 1 ? "" : "s"
                      }`
                    : "All transactions"}
                </p>

                {hasActiveFilters && (
                  <p className="shrink-0 text-sm font-medium text-[#777269]">
                    KSh {formatAmount(filteredTotal)}
                  </p>
                )}
              </div>

              {/* Transactions */}
              {filteredExpenses.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-[#e7e2d8] bg-[#fbfaf7]">
                  {filteredExpenses.map((expense, index) => (
                    <button
                      key={expense.id}
                      type="button"
                      onClick={() => setSelectedExpense(expense)}
                      className={`flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-[#f6f4ef] sm:px-5 ${
                        index !== filteredExpenses.length - 1
                          ? "border-b border-[#e7e2d8]"
                          : ""
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-[#242321]">
                            {expense.category}
                          </p>

                          <span className="rounded-full bg-[#f0e8da] px-2 py-1 text-[11px] font-semibold text-[#8b6532]">
                            {expense.type}
                          </span>
                        </div>

                        <p className="mt-1 truncate text-sm text-[#8b867c]">
                          {expense.note || "No note"} ·{" "}
                          {formatDateTime(expense.date)}
                        </p>
                      </div>

                      <p className="shrink-0 text-base font-semibold text-[#242321]">
                        KSh {formatAmount(expense.amount)}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-[#e7e2d8] bg-[#fbfaf7] px-6 py-12 text-center">
                  <p className="text-lg font-semibold">Nothing found</p>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#8b867c]">
                    Try a different search or remove some filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-xl bg-[#242321] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#34322f] active:scale-[0.98]"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        <ExpenseDetailsModal
          expense={selectedExpense}
          onClose={() => {
            if (!isUpdating && !isDeleting) {
              setSelectedExpense(null);
              setUpdateError("");
            }
          }}
          onEdit={() => {
            setUpdateError("");
            setIsEditing(true);
          }}
          onDelete={() => {
            setDeleteError("");
            setIsDeleteConfirmationOpen(true);
          }}
          formatAmount={formatAmount}
          formatDateTime={formatDateTime}
        />

        {isDeleteConfirmationOpen && (
          <DeleteExpenseModal
            expense={selectedExpense}
            onClose={() => {
              if (!isDeleting) {
                setIsDeleteConfirmationOpen(false);
                setDeleteError("");
              }
            }}
            onConfirm={handleDeleteExpense}
            isDeleting={isDeleting}
            error={deleteError}
            formatAmount={formatAmount}
          />
        )}

        {isEditing && (
          <EditExpenseModal
            expense={selectedExpense}
            onClose={() => {
              if (!isUpdating) {
                setIsEditing(false);
                setUpdateError("");
              }
            }}
            onSave={handleUpdateExpense}
            isSaving={isUpdating}
            error={updateError}
          />
        )}
      </main>
    </div>
  );
};

export default Transactions;
