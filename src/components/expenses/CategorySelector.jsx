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
        <label className="text-sm font-medium text-gray-600">
          Category
        </label>

        {value && (
          <span className="text-sm font-medium text-gray-900">
            {value}
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {categories.map((category) => {
          const isSelected = value === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={`rounded-xl px-3 py-3 text-sm font-medium transition ${
                isSelected
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-700 ring-1 ring-gray-100 hover:bg-gray-100"
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