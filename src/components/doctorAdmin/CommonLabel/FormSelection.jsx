
export default function FormSection({ title, children, action, color, className }) {
    return (
        <section className={`${className} rounded-lg bg-white p-4 `}>
            {/* border border-gray-200 */}
            <div className="flex items-center justify-between">
                {title && (
                    <h3 className={`${color} text-[#434343] text-xs font-normal font-poppins capitalize pb-2`}>
                        {title}
                    </h3>
                )}
                {action}
            </div>
            <div className="space-y-3">{children}</div>
        </section >
    );
}
