import { FiCheck } from "react-icons/fi";

const spendingTypes = [
  {
    name: "Need",
    description: "Necessary spending",
  },
  {
    name: "Want",
    description: "Could live without it",
  },
  {
    name: "Growth",
    description: "Investing in my future",
  },
  {
    name: "Waste",
    description: "Not worth the money",
  },
];

const SpendingTypeSelector = ({ value, onChange }) => {
  return (
    <section>
      <label className="mb-3 block text-sm font-medium text-[#5f5b54]">
        What kind of spending was this?
      </label>

      <div className="grid gap-2 sm:grid-cols-2">
        {spendingTypes.map((type) => {
          const isSelected = value === type.name;

          return (
            <button
              key={type.name}
              type="button"
              onClick={() => onChange(type.name)}
              className={`flex min-h-19.5 items-center justify-between rounded-2xl border px-4 py-4 text-left transition active:scale-[0.99] ${
                isSelected
                  ? "border-[#242321] bg-[#242321] text-white shadow-sm"
                  : "border-[#e7e2d8] bg-white text-[#242321] hover:border-[#d5cec1] hover:bg-[#faf9f6]"
              }`}
            >
              <div>
                <p className="font-semibold">{type.name}</p>

                <p
                  className={`mt-1 text-sm ${
                    isSelected
                      ? "text-[#d8d3c9]"
                      : "text-[#8b867c]"
                  }`}
                >
                  {type.description}
                </p>
              </div>

              {isSelected && (
                <span className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#b8873d] text-white">
                  <FiCheck size={15} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SpendingTypeSelector;