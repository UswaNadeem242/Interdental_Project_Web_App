export function FormSection({ title, children }) {
    return (
      <div className="border border-[#0000000D] mt-6">
        <div className="border-b border-[#0000000D] pt-3 pl-2 pr-2">
          <h2 className="text-sm font-semibold mb-4 text-[#434343]">{title}</h2>
        </div>
        <form className="space-y-6 text-sm text-[#949494] p-4">{children}</form>
      </div>
    );
  }