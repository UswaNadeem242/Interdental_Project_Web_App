export default function FormSection({ title, children, action, color, className }) {
    return (
        <section className={` ${className} rounded-lg `}>

            {/* border border-gray-200 */}
            <div className="flex items-center justify-between gap-4">

                {title && (
                    <h3 className={`${color} text-primaryText text-xs font-normal font-poppins capitalize `}>
                        {title}
                    </h3>
                )}
                {action}
            </div>
            <div className="space-y-3">{children}</div>
        </section >
    );
}
