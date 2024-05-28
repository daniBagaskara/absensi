export default function SelectBox({
    className = "",
    options,
    currentValue,
    ...props
}) {
    return (
        <select
            {...props}
            className={
                "border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" +
                className
            }
            value={currentValue}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
