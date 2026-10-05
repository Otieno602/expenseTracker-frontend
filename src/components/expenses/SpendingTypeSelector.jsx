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
      <label className="mb-3 block text-sm font-medium text-gray-600">
        What kind of spending was this?
      </label>

      <div className="space-y-2">
        {spendingTypes.map((type) => {
          const isSelected = value === type.name;

          return (
            <button
              key={type.name}
              type="button"
              onClick={() => onChange(type.name)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left transition ${
                isSelected
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-900 ring-1 ring-gray-100 hover:bg-gray-100"
              }`}
            >
              <div>
                <p className="font-semibold">{type.name}</p>

                <p
                  className={`text-sm ${
                    isSelected
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {type.description}
                </p>
              </div>

              {isSelected && <FiCheck size={20} />}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default SpendingTypeSelector;