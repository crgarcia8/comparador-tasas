"use client";

export default function Results({ result }) {
  const format = (n) =>
    (Math.round(n) || 0).toLocaleString("es-CO", { maximumFractionDigits: 0 });

  if (!result) return null;

  if (result.error) {
    return (
      <div className="mt-6 p-4 bg-red-100 rounded text-red-800">
        {result.error}
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-green-100 rounded">
      <h3 className="text-lg font-semibold mb-2">Resultados:</h3>
      <p>
        Pago mensual calculado: <strong>${format(result.pagoMensual)}</strong>
      </p>
      <p>
        Total a pagar: <strong>${format(result.totalPagado)}</strong>
      </p>
      <p>
        Intereses pagados: <strong>${format(result.totalInteres)}</strong>
      </p>
      <p>
        Tiempo estimado para saldar la deuda: <strong>{result.meses} meses</strong>
      </p>
    </div>
  );
}
