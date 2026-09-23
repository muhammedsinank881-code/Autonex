import { useState } from "react";

function SearchableSelect({
  value = [],
  onChange,
  data = [],
  placeholder = "Search...",
  multiple = false,
  getOptionLabel = (item) => item.name,
  getOptionValue = (item) => item._id,
}) {
  const [search, setSearch] = useState("");

  const selectedValues = multiple ? value : value ? [value] : [];

  const selectedItems = data.filter((item) =>
    selectedValues.includes(getOptionValue(item)),
  );

  const filteredData = data.filter((item) =>
    String(getOptionLabel(item) || "")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const handleSelect = (item) => {
    const id = getOptionValue(item);

    if (multiple) {
      if (!selectedValues.includes(id)) {
        onChange([...selectedValues, id]);
      }
    } else {
      onChange(id);
      setSearch("");
    }
  };

  const handleRemove = (id) => {
    if (multiple) {
      onChange(selectedValues.filter((value) => value !== id));
    } else {
      onChange("");
    }
  };

  return (
    <div className="relative">
      {/* Selected Items */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedItems.map((item) => (
            <div
              key={getOptionValue(item)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0066B2]/10 border border-[#0066B2]/20 text-xs"
            >
              <span>{getOptionLabel(item)}</span>

              <button
                type="button"
                onClick={() => handleRemove(getOptionValue(item))}
                className="text-slate-400 hover:text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0066B2]/20 focus:border-[#0066B2]"
      />

      {/* Results */}
      {search && (
        <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <button
                type="button"
                key={getOptionValue(item)}
                onClick={() => handleSelect(item)}
                className="block w-full px-3 py-2 text-left text-xs hover:bg-slate-50"
              >
                {getOptionLabel(item)}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-xs text-slate-400">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchableSelect;
