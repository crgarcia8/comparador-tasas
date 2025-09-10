// import tasas from "../../data/tasas.json";
// import Simulator from "../components/SimulatorForm";

// function teaToTem(tea) {
//   return Math.pow(1 + tea, 1 / 12) - 1;
// }

// export async function generateStaticParams() {
//   return tasas.map((t) => ({ slug: t.slug }));
// }

// export default function CardPage({ params }) {
//   const data = tasas.find((t) => t.slug === params.slug);

//   if (!data) return <p>Tarjeta no encontrada</p>;

//   const tem = teaToTem(data.tea);

//   return (
//     <main className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">
//           {data.bank} — {data.card}
//         </h1>
//         <p className="text-gray-600 mb-4">
//           <strong>TEA:</strong> {(data.tea * 100).toFixed(2)}% <br />
//           <strong>TEM:</strong> {(tem * 100).toFixed(2)}%
//         </p>

//         {/* Simulador */}
//         <Simulator tem={tem} />

//         <p className="text-gray-500 text-sm mt-4">
//           Datos de ejemplo — tasas aproximadas, solo para pruebas del MVP.
//         </p>
//       </div>
//     </main>
//   );
// }
