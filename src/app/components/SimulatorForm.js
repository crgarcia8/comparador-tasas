"use client";

import { useState } from "react";

export default function SimulatorForm({
  selectedBank,
  tea,
  setTea,
  onSimulate,
  resetResult,
}) {
  const [balance, setBalance] = useState("");
  const [months, setMonths] = useState("");
  const [error, setError] = useState("");

  // Formatea un número como moneda con separador de miles
  const formatCurrency = (value) => {
    if (!value) return "";
    const number = Number(value.replace(/\D/g, "")); // elimina todo lo que no sea número
    return number.toLocaleString("es-CO");
  };

  // Convierte un string formateado a número para cálculos
  const parseCurrency = (value) => Number(value.replace(/\./g, "") || 0);

  const handleBalanceChange = (e) => {
    const raw = e.target.value;
    // solo permite dígitos
    const clean = raw.replace(/\D/g, "");
    setBalance(formatCurrency(clean));
    resetResult();
  };
  const handleTeaChange = (e) => {
    setTea(e.target.value);
    resetResult();
  };
  const handleMonthsChange = (e) => {
    const value = Number(e.target.value);
    setMonths(value > 360 ? 360 : value);
    resetResult();
  };

  const handleSubmit = () => {
    setError("");

    const principal = parseCurrency(balance);
    const n = Number(months);
    const teaDecimal = Number(tea) / 100;

    if (!principal || !n || !teaDecimal) {
      setError("Completa todos los campos correctamente.");
      return;
    }

    // Calcula el pago mensual automáticamente
    const tem = teaDecimal / 12;
    const payment = (principal * tem) / (1 - Math.pow(1 + tem, -n));

    onSimulate({ balance: principal, payment, months: n, tea });
  };

  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">
        {selectedBank.bank} — {selectedBank.card}
      </h2>

      <div className="mt-2 space-y-4">
        {/* Deuda inicial */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Deuda inicial:
          </label>
          <input
            type="text"
            value={balance}
            placeholder="1.000.000"
            onChange={handleBalanceChange}
            className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* TEA y Meses */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              TEA (%):
            </label>
            <input
              type="number"
              value={tea}
              onChange={handleTeaChange}
              className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:ring-2 focus:ring-blue-300"
            />
            {tea && (
              <p className="mt-1 text-xs text-gray-600">
                Interés mensual aproximado:{" "}
                <strong>{(Number(tea) / 12).toFixed(2)}%</strong>
              </p>
            )}
          </div>

          <div className="sm:w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Meses:
            </label>
            <input
              type="number"
              value={months}
              onChange={handleMonthsChange}
              className="w-full border border-gray-300 px-3 py-2 text-sm rounded focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-pink-400 text-white font-semibold text-sm py-2 px-3 rounded hover:bg-pink-500 transition"
        >
          Simular
        </button>
      </div>
    </div>
  );
}
