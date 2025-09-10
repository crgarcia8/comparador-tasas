"use client";

import { useState } from "react";
import tasas from "./data/tasas.json";
import BankSelector from "./components/BankSelector";
import SimulatorForm from "./components/SimulatorForm";
import Results from "./components/Results";

export default function Home() {
  const [selectedBank, setSelectedBank] = useState(null);
  const [tea, setTea] = useState("");
  const [result, setResult] = useState(null);
  const resetResult = () => setResult(null);

  const handleSimulate = ({ balance, months, tea }) => {
    setResult(null);

    const principal = Number(balance);
    const n = Number(months);
    const teaDecimal = Number(tea) / 100;

    if (!principal || !n || !teaDecimal) {
      setResult({ error: "Completa todos los campos correctamente." });
      return;
    }

    const tem = teaDecimal / 12; // tasa mensual
    // Pago mensual usando fórmula de amortización
    const payment = (principal * tem) / (1 - Math.pow(1 + tem, -n));

    let deuda = principal;
    let totalInteres = 0;
    let totalPagado = 0;

    for (let i = 0; i < n; i++) {
      const interes = deuda * tem;
      totalInteres += interes;
      deuda += interes;
      const pagoEsteMes = Math.min(payment, deuda);
      deuda -= pagoEsteMes;
      totalPagado += pagoEsteMes;
    }

    setResult({
      meses: n,
      totalPagado,
      totalInteres,
      deudaFinal: Math.max(0, deuda),
      pagoMensual: payment,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-green-50 text-gray-800">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Comparador de Tasas de Tarjetas de Crédito
        </h1>

        <BankSelector
          tasas={tasas}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          setTea={setTea}
        />

        {selectedBank ? (
          <>
            <SimulatorForm
              selectedBank={selectedBank}
              tea={tea}
              setTea={setTea}
              onSimulate={handleSimulate}
              resetResult={resetResult}
            />
            <Results result={result} />
          </>
        ) : (
          <p className="text-center text-gray-600">
            Selecciona un banco para comenzar la simulación.
          </p>
        )}

        <p className="mt-6 text-sm text-gray-500 text-center">
          Datos de ejemplo — tasas aproximadas, solo para pruebas del MVP.
        </p>
      </div>
    </div>
  );
}
