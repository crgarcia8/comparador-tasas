"use client";

export default function BankSelector({ tasas, selectedBank, setSelectedBank, setTea }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6">
      {tasas.map((banco) => (
        <button
          key={banco.slug}
          onClick={() => {
            setSelectedBank(banco);
            setTea((banco.tea * 100).toString()); // cargamos la TEA por defecto en %
          }}
          className={`px-4 py-2 rounded-full border transition-all duration-200 ${
            selectedBank?.slug === banco.slug
              ? "bg-blue-400 text-white border-blue-400 hover:bg-blue-500 shadow-md"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-200 hover:border-blue-300 hover:shadow-md"
          }`}
        >
          {banco.bank}
        </button>
      ))}
    </div>
  );
}
