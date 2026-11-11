import { useEffect, useMemo, useState } from "react";
import {
  FiArrowDownRight,
  FiArrowRight,
  FiArrowUpRight,
  FiCalendar,
  FiEye,
  FiPlus,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const spendingTypes = ["Need", "Want", "Growth", "Waste"];

const typeDescriptions = {
  Need: "Necessary spending",
  Want: "Things you enjoy",
  Growth: "Investing in your future",
  Waste: "Spending you regret",
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
        console.error("Dashboard fetch error:", error);
        setError("Couldn't load your spending overview.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const now = new Date();

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  // Today starts at local midnight
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  // Weeks start on Monday
  const currentWeekStart = new Date(now);
  currentWeekStart.setHours(0, 0, 0, 0);

  const daysSinceMonday = (currentWeekStart.getDay() + 6) % 7;
  currentWeekStart.setDate(currentWeekStart.getDate() - daysSinceMonday);

  // Equivalent period from the previous week
  const previousWeekStart = new Date(currentWeekStart);
  previousWeekStart.setDate(previousWeekStart.getDate() - 7);

  const previousWeekPeriodEnd = new Date(
    previousWeekStart.getTime() + (now.getTime() - currentWeekStart.getTime()),
  );

  const currentMonthExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const date = new Date(expense.date);
      return date >= monthStart && date < nextMonthStart;
    });
  }, [expenses, monthStart.getTime(), nextMonthStart.getTime()]);

  const previousMonthExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const date = new Date(expense.date);
      return date >= previousMonthStart && date < monthStart;
    });
  }, [expenses, previousMonthStart.getTime(), monthStart.getTime()]);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [expenses]);

  const todayExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const date = new Date(expense.date);
      return date >= todayStart && date <= now;
    });
  }, [expenses, todayStart.getTime(), now.getTime()]);

  const currentWeekExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const date = new Date(expense.date);
      return date >= currentWeekStart && date <= now;
    });
  }, [expenses, currentWeekStart.getTime(), now.getTime()]);

  const previousWeekExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const date = new Date(expense.date);
      return date >= previousWeekStart && date <= previousWeekPeriodEnd;
    });
  }, [expenses, previousWeekStart.getTime(), previousWeekPeriodEnd.getTime()]);

  const currentMonthTotal = currentMonthExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const previousMonthTotal = previousMonthExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const todayTotal = todayExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const currentWeekTotal = currentWeekExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const previousWeekTotal = previousWeekExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0,
  );

  const weeklyChange =
    previousWeekTotal > 0
      ? ((currentWeekTotal - previousWeekTotal) / previousWeekTotal) * 100
      : null;

  const averageDaily = currentMonthTotal / now.getDate();

  const monthlyChange =
    previousMonthTotal > 0
      ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
      : null;

  const typeBreakdown = spendingTypes.map((type) => {
    const total = currentMonthExpenses
      .filter((expense) => expense.type === type)
      .reduce((sum, expense) => sum + Number(expense.amount), 0);

    return {
      name: type,
      total,
      percentage: currentMonthTotal > 0 ? (total / currentMonthTotal) * 100 : 0,
    };
  });

  const categoryBreakdown = Object.values(
    currentMonthExpenses.reduce((result, expense) => {
      const category = expense.category;
      result[category] ??= { name: category, total: 0 };
      result[category].total += Number(expense.amount);
      return result;
    }, {}),
  ).sort((a, b) => b.total - a.total);

  const recentExpenses = sortedExpenses.slice(0, 5);

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-KE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-KE", {
      day: "numeric",
      month: "short",
    }).format(new Date(date));

  const monthLabel = new Intl.DateTimeFormat("en-KE", {
    month: "long",
    year: "numeric",
  }).format(now);

  const previousMonthLabel = new Intl.DateTimeFormat("en-KE", {
    month: "long",
  }).format(previousMonthStart);

  const hasExpenses = expenses.length > 0;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f6f4ef] text-[#242321]">
      <main className="mx-auto min-h-screen w-full max-w-6xl min-w-0 px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <header className="mb-9 flex items-center justify-between gap-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <FiEye size={15} className="text-[#b8873d]" />
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8b867c]">
                Moneye
              </p>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Your money, in view.
            </h1>
            <p className="mt-1 text-sm text-[#8b867c]">
              Here's how your spending looks.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/add-expense")}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#242321] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#34322f] active:scale-[0.98]"
          >
            <FiPlus size={17} />
            <span className="hidden sm:inline">Add expense</span>
            <span className="sm:hidden">Add</span>
          </button>
        </header>

        {/* Month heading */}
        <div className="mb-5 flex items-center gap-2">
          <FiCalendar size={16} className="text-[#b8873d]" />
          <p className="text-sm font-medium text-[#777269]">{monthLabel}</p>
        </div>

        {isLoading && (
          <div className="rounded-2xl border border-[#e7e2d8] bg-[#fbfaf7] px-5 py-12 text-center">
            <p className="text-sm text-[#8b867c]">
              Looking at your spending...
            </p>
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-10 text-center">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {!isLoading && !error && !hasExpenses && (
          <div className="rounded-[28px] border border-[#e7e2d8] bg-[#fbfaf7] px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f0e8da] text-[#b8873d]">
              <FiEye size={28} />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Your money story starts here.
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#8b867c]">
              Record your first expense. As you do, Moneye will help you see
              where your money goes and understand your spending habits.
            </p>

            <button
              type="button"
              onClick={() => navigate("/add-expense")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#242321] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#34322f]"
            >
              <FiPlus size={17} />
              Record an expense
            </button>
          </div>
        )}

        {!isLoading && !error && hasExpenses && (
          <>
            {/* Summary cards */}
            <section className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="col-span-2 rounded-24px bg-[#242321] p-5 text-white sm:p-6 lg:col-span-1">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#c8c1b5]">
                  Spent this month
                </p>

                <p className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  <span className="mr-1 text-base font-medium text-[#c8c1b5]">
                    KSh
                  </span>
                  {formatAmount(currentMonthTotal)}
                </p>

                <p className="mt-3 text-xs text-[#c8c1b5]">
                  {currentMonthExpenses.length} spending records
                </p>
              </div>

              <div className="rounded-24px border border-[#e7e2d8] bg-[#fbfaf7] p-4 sm:p-5">
                <p className="text-xs font-medium text-[#8b867c]">
                  Daily average
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  KSh {formatAmount(averageDaily)}
                </p>
                <p className="mt-2 text-xs text-[#a29d94]">Per calendar day</p>
              </div>

              <div className="rounded-24px border border-[#e7e2d8] bg-[#fbfaf7] p-4 sm:p-5">
                <p className="text-xs font-medium text-[#8b867c]">
                  Previous month
                </p>
                <p className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  KSh {formatAmount(previousMonthTotal)}
                </p>
                <p className="mt-2 text-xs text-[#a29d94]">
                  {previousMonthLabel}
                </p>
              </div>

              <div className="rounded-24px border border-[#e7e2d8] bg-[#fbfaf7] p-4 sm:p-5">
                <p className="text-xs font-medium text-[#8b867c]">
                  Month comparison
                </p>

                {monthlyChange === null ? (
                  <>
                    <p className="mt-3 text-xl font-semibold">—</p>
                    <p className="mt-2 text-xs text-[#a29d94]">
                      No previous data
                    </p>
                  </>
                ) : (
                  <>
                    <div className="mt-3 flex items-center gap-1">
                      {monthlyChange > 0 ? (
                        <FiArrowUpRight size={21} className="text-red-600" />
                      ) : monthlyChange < 0 ? (
                        <FiArrowDownRight
                          size={21}
                          className="text-emerald-700"
                        />
                      ) : null}

                      <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {Math.abs(monthlyChange).toFixed(1)}%
                      </p>
                    </div>

                    <p className="mt-2 text-xs text-[#a29d94]">
                      {monthlyChange > 0
                        ? "More than last month"
                        : monthlyChange < 0
                          ? "Less than last month"
                          : "Same as last month"}
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* Short-term overview */}
            <section className="mb-8">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Short-term overview</h2>
                <p className="mt-1 text-sm text-[#8b867c]">
                  Keep track of your spending as the week unfolds.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <div className="rounded-24px border border-[#e7e2d8] bg-[#fbfaf7] p-4 sm:p-5">
                  <p className="text-xs font-medium text-[#8b867c]">
                    Spent today
                  </p>
                  <p className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                    KSh {formatAmount(todayTotal)}
                  </p>
                  <p className="mt-2 text-xs text-[#a29d94]">
                    {todayExpenses.length} spending records
                  </p>
                </div>

                <div className="rounded-24px border border-[#e7e2d8] bg-[#fbfaf7] p-4 sm:p-5">
                  <p className="text-xs font-medium text-[#8b867c]">
                    Spent this week
                  </p>
                  <p className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                    KSh {formatAmount(currentWeekTotal)}
                  </p>
                  <p className="mt-2 text-xs text-[#a29d94]">Monday – today</p>
                </div>

                <div className="rounded-24px border border-[#e7e2d8] bg-[#fbfaf7] p-4 sm:p-5">
                  <p className="text-xs font-medium text-[#8b867c]">
                    Previous week
                  </p>
                  <p className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                    KSh {formatAmount(previousWeekTotal)}
                  </p>
                  <p className="mt-2 text-xs text-[#a29d94]">
                    Same period last week
                  </p>
                </div>

                <div className="rounded-24px border border-[#e7e2d8] bg-[#fbfaf7] p-4 sm:p-5">
                  <p className="text-xs font-medium text-[#8b867c]">
                    Weekly comparison
                  </p>

                  {weeklyChange === null ? (
                    <>
                      <p className="mt-3 text-xl font-semibold">—</p>
                      <p className="mt-2 text-xs text-[#a29d94]">
                        {currentWeekTotal > 0
                          ? "No spending last week"
                          : "No comparison yet"}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="mt-3 flex items-center gap-1">
                        {weeklyChange > 0 ? (
                          <FiArrowUpRight size={21} className="text-red-600" />
                        ) : weeklyChange < 0 ? (
                          <FiArrowDownRight
                            size={21}
                            className="text-emerald-700"
                          />
                        ) : null}

                        <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                          {Math.abs(weeklyChange).toFixed(1)}%
                        </p>
                      </div>

                      <p className="mt-2 text-xs text-[#a29d94]">
                        {weeklyChange > 0
                          ? "More than last week"
                          : weeklyChange < 0
                            ? "Less than last week"
                            : "Same as last week"}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </section>

            {/* Spending type breakdown */}
            <section className="mb-6 rounded-24px border border-[#e7e2d8] bg-[#fbfaf7] p-5 sm:p-7">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Where your money goes</h2>
                <p className="mt-1 text-sm text-[#8b867c]">
                  Your spending quality, not just quantity.
                </p>
              </div>

              <div className="space-y-6">
                {typeBreakdown.map((item) => (
                  <div key={item.name}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="mt-0.5 text-xs text-[#a29d94]">
                          {typeDescriptions[item.name]}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          KSh {formatAmount(item.total)}
                        </p>
                        <p className="mt-0.5 text-xs text-[#8b867c]">
                          {item.percentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-[#eeeae2]">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.name === "Need"
                            ? "bg-[#777269]"
                            : item.name === "Want"
                              ? "bg-[#b8873d]"
                              : item.name === "Growth"
                                ? "bg-[#748b72]"
                                : "bg-[#b66c61]"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Category breakdown */}
            <section className="mb-6 rounded-24px border border-[#e7e2d8] bg-[#fbfaf7] p-5 sm:p-7">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    Spending by category
                  </h2>
                  <p className="mt-1 text-sm text-[#8b867c]">
                    What's taking the biggest share?
                  </p>
                </div>
              </div>

              {categoryBreakdown.length > 0 ? (
                <div className="space-y-5">
                  {categoryBreakdown.slice(0, 5).map((item) => {
                    const percentage =
                      currentMonthTotal > 0
                        ? (item.total / currentMonthTotal) * 100
                        : 0;

                    return (
                      <div key={item.name}>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-sm font-medium">{item.name}</p>
                          <div className="text-right">
                            <p className="text-sm font-semibold">
                              KSh {formatAmount(item.total)}
                            </p>
                            <p className="text-xs text-[#a29d94]">
                              {percentage.toFixed(1)}%
                            </p>
                          </div>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-[#eeeae2]">
                          <div
                            className="h-full rounded-full bg-[#b8873d]"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-[#8b867c]">
                  No spending recorded this month yet.
                </p>
              )}
            </section>

            {/* Recent transactions */}
            <section className="overflow-hidden rounded-24px border border-[#e7e2d8] bg-[#fbfaf7]">
              <div className="flex items-center justify-between gap-3 p-5 sm:px-7 sm:py-6">
                <div>
                  <h2 className="text-lg font-semibold">Recent transactions</h2>
                  <p className="mt-1 text-sm text-[#8b867c]">
                    Your latest spending activity.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/transactions")}
                  className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#a47736] transition hover:text-[#805a28]"
                >
                  View all
                  <FiArrowRight size={16} />
                </button>
              </div>

              {recentExpenses.length > 0 ? (
                <div>
                  {recentExpenses.map((expense, index) => (
                    <div
                      key={expense.id}
                      className={`flex items-center justify-between gap-4 px-5 py-4 sm:px-7 ${
                        index !== recentExpenses.length - 1
                          ? "border-t border-[#e7e2d8]"
                          : "border-t border-[#e7e2d8]"
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {expense.category}
                        </p>
                        <p className="mt-1 truncate text-xs text-[#8b867c]">
                          {expense.note || expense.type} ·{" "}
                          {formatDate(expense.date)}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm font-semibold">
                        KSh {formatAmount(expense.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="border-t border-[#e7e2d8] px-5 py-6 text-sm text-[#8b867c]">
                  No transactions recorded this month yet.
                </p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
