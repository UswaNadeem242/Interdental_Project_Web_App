export const ChartDropDown = ({
  title,
  selectedPeriod,
  setSelectedPeriod,
  onChange,
}) => {
  return (
    <div className="flex justify-between items-center mb-4 font-poppins ">
      <h2 className="text-lg font-semibold text-primaryText ">{title}</h2>
      <select
        value={selectedPeriod}
        onChange={onChange}
        className="border border-gray-100 rounded-md px-3 py-1 text-sm"
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};
