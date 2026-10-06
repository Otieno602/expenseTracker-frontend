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

const CategorySelector = ({ value, onChange }) => {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <label className="text-sm font-medium text-[#5f5b54]">
          Category
        </label>

        {value && (
          <span className="text-xs font-semibold text-[#b8873d]">
            {value}
          </span>
        )}
      </div>

      <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:grid-cols-3">
        {categories.map((category) => {
          const isSelected = value === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={`min-h-12 min-w-0 rounded-xl px-3 py-3 text-sm font-medium transition active:scale-[0.98] ${
                isSelected
                  ? "bg-[#242321] text-white shadow-sm"
                  : "border border-[#e7e2d8] bg-white text-[#5f5b54] hover:border-[#d5cec1] hover:bg-[#faf9f6]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategorySelector;