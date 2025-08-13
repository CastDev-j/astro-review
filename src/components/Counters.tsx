import { useStore } from "@nanostores/react";
import {
  FaPlus,
  FaMinus,
  FaToggleOn,
  FaToggleOff,
  FaTrash,
} from "react-icons/fa";
import { cn } from "@/shared/cn";
import {
  counters,
  addCounter,
  decrementCounter,
  incrementCounter,
  toggleCounterActive,
  activateAllCounters,
  desactivateAllCounters,
  deleteCounter,
  isLoading,
} from "src/store/nanoStore";
import { loadCounters } from "src/store/nanoStore";
import { useEffect, useState } from "react";

export const Counters = () => {
  useEffect(() => {
    loadCounters();
  }, []);

  const loadingGlobal = useStore(isLoading);
  const counterList = useStore(counters);

  // Estados de loaders individuales
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingIncrement, setLoadingIncrement] = useState<number | null>(null);
  const [loadingDecrement, setLoadingDecrement] = useState<number | null>(null);
  const [loadingToggle, setLoadingToggle] = useState<number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const [loadingToggleAll, setLoadingToggleAll] = useState(false);

  if (loadingGlobal) {
    return <CounterLoader />;
  }

  const mostlyActive =
    counterList.length / 2 < counterList.filter((c) => c.active).length;

  // Handlers con loaders locales
  const handleAddCounter = async () => {
    setLoadingCreate(true);
    await addCounter();
    setLoadingCreate(false);
  };

  const handleIncrement = async (id: number) => {
    setLoadingIncrement(id);
    await incrementCounter(id);
    setLoadingIncrement(null);
  };

  const handleDecrement = async (id: number) => {
    setLoadingDecrement(id);
    await decrementCounter(id);
    setLoadingDecrement(null);
  };

  const handleToggleActive = async (id: number) => {
    setLoadingToggle(id);
    await toggleCounterActive(id);
    setLoadingToggle(null);
  };

  const handleToggleAll = async () => {
    setLoadingToggleAll(true);
    mostlyActive ? await desactivateAllCounters() : await activateAllCounters();
    setLoadingToggleAll(false);
  };

  const handleDelete = async (id: number) => {
    if (loadingDelete) return;

    setLoadingDelete(id);
    await deleteCounter(id);
    setLoadingDelete(null);
  };

  return (
    <div className="p-4 mx-auto bg-white rounded border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Contadores</h2>
      <div className="flex gap-2 mb-4">
        <button
          className={cn(
            "flex items-center gap-1 px-2 py-1 border rounded text-sm bg-white text-gray-700 hover:bg-gray-50 transition-all",
            loadingCreate && "animate-pulse bg-gray-100 border-gray-200"
          )}
          onClick={handleAddCounter}
          disabled={loadingCreate}
        >
          <FaPlus /> Nuevo
        </button>
        <button
          className={cn(
            "flex items-center justify-center gap-1 px-2 py-1 border rounded text-sm transition-all",
            mostlyActive
              ? "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
              : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100",
            loadingToggleAll && "animate-pulse"
          )}
          onClick={handleToggleAll}
          disabled={loadingToggleAll}
        >
          {mostlyActive ? (
            <>
              Desactivar todo <FaToggleOn />
            </>
          ) : (
            <>
              Activar todo <FaToggleOff />
            </>
          )}
        </button>
      </div>
      <div className="space-y-2 relative">
        {counterList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <FaPlus size={32} className="mb-2" />
            <span>No hay contadores. Crea uno nuevo.</span>
          </div>
        ) : (
          counterList.map((counter) => (
            <div
              key={counter.id}
              className={cn(
                "flex items-center justify-between px-2 py-2 border rounded transition-all duration-200",
                counter.active
                  ? "bg-white border-gray-200 hover:border-gray-300"
                  : "bg-gray-50 border-gray-100 opacity-60",
                loadingDelete === counter.id &&
                  "opacity-0 h-0 py-0 border-0 mb-0 overflow-hidden transition-all duration-300"
              )}
            >
              <span
                className={cn(
                  "text-base font-medium transition-colors duration-200",
                  counter.active ? "text-gray-800" : "text-gray-400",
                  loadingIncrement === counter.id && "scale-110",
                  loadingDecrement === counter.id && "scale-110"
                )}
              >
                {counter.value}
              </span>
              <div className="flex items-center gap-1">
                <button
                  className={cn(
                    "px-2 py-1 rounded border text-xs bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200",
                    !counter.active && "opacity-50 cursor-not-allowed",
                    loadingIncrement === counter.id &&
                      "scale-95 bg-gray-100 border-gray-300"
                  )}
                  onClick={() => handleIncrement(counter.id)}
                  disabled={!counter.active || loadingIncrement === counter.id}
                >
                  <FaPlus />
                </button>
                <button
                  className={cn(
                    "px-2 py-1 rounded border text-xs bg-white text-gray-700 hover:bg-gray-50 transition-all duration-200",
                    !counter.active && "opacity-50 cursor-not-allowed",
                    loadingDecrement === counter.id &&
                      "scale-95 bg-gray-100 border-gray-300"
                  )}
                  onClick={() => handleDecrement(counter.id)}
                  disabled={!counter.active || loadingDecrement === counter.id}
                >
                  <FaMinus />
                </button>
                <button
                  className={cn(
                    "px-2 py-1 rounded border text-xs flex items-center transition-all duration-200",
                    counter.active
                      ? "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
                      : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100",
                    loadingToggle === counter.id && "animate-pulse"
                  )}
                  onClick={() => handleToggleActive(counter.id)}
                  disabled={loadingToggle === counter.id}
                >
                  {counter.active ? <FaToggleOn /> : <FaToggleOff />}
                </button>
                <button
                  className={cn(
                    "px-2 py-1 rounded border text-xs bg-red-50 text-red-700 hover:bg-red-100 border-red-200 transition-all duration-200",
                    !counter.active && "opacity-50 cursor-not-allowed",
                    loadingDelete &&
                      "bg-red-100 border-red-300 animate-pulse"
                  )}
                  onClick={() => handleDelete(counter.id)}
                  disabled={!counter.active || !!loadingDelete }
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const CounterLoader = () => (
  <div className="p-4 mx-auto bg-white rounded border border-gray-200 shadow-sm animate-pulse">
    <h2 className="text-lg font-semibold mb-3 text-gray-800">Contadores</h2>
    <div className="flex gap-2 mb-4">
      <div className="h-8 w-24 bg-gray-100 rounded" />
      <div className="h-8 w-32 bg-gray-100 rounded" />
    </div>
    <div className="space-y-2">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between px-2 py-2 border rounded bg-gray-50 border-gray-100 opacity-60"
        >
          <div className="h-6 w-12 bg-gray-200 rounded" />
          <div className="flex items-center gap-1">
            <div className="h-8 w-8 bg-gray-100 rounded" />
            <div className="h-8 w-8 bg-gray-100 rounded" />
            <div className="h-8 w-8 bg-gray-100 rounded" />
            <div className="h-8 w-8 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);
