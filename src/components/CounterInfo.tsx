import { useStore } from "@nanostores/react";
import { counters } from "src/store/nanoStore";

export const CounterInfo = () => {
  const counterList = useStore(counters);

  const total = counterList.length;
  const activeCount = counterList.filter((c) => c.active).length;
  const inactiveCount = total - activeCount;
  const sum = counterList.reduce((acc, c) => acc + c.value, 0);
  const zeroCount = counterList.filter((c) => c.value === 0).length;
  const positiveCount = counterList.filter((c) => c.value > 0).length;
  const negativeCount = counterList.filter((c) => c.value < 0).length;
  const evenCount = counterList.filter(
    (c) => c.value % 2 === 0 && c.value !== 0
  ).length;
  const oddCount = counterList.filter((c) => c.value % 2 !== 0).length;

  return (
    <div className="p-4 mx-auto">
      <h2 className="text-lg font-bold mb-2">Información de Contadores</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <ul className="space-y-1">
            <li>
              Total de contadores:{" "}
              <span className="font-semibold">{total}</span>
            </li>
            <li>
              Activos: <span className="font-semibold">{activeCount}</span>
            </li>
            <li>
              Inactivos: <span className="font-semibold">{inactiveCount}</span>
            </li>
            <li>
              Suma de valores: <span className="font-semibold">{sum}</span>
            </li>
            <li>
              Valor cero: <span className="font-semibold">{zeroCount}</span>
            </li>
          </ul>
        </div>
        <div>
          <ul className="space-y-1">
            <li>
              Positivos: <span className="font-semibold">{positiveCount}</span>
            </li>
            <li>
              Negativos: <span className="font-semibold">{negativeCount}</span>
            </li>
            <li>
              Pares: <span className="font-semibold">{evenCount}</span>
            </li>
            <li>
              Impares: <span className="font-semibold">{oddCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
