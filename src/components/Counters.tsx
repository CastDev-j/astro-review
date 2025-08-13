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
} from "src/store/nanoStore";

export const Counters = () => {
  const counterList = useStore(counters);
  const mostlyActive =
    counterList.length / 2 < counterList.filter((c) => c.active).length;

  return (
    <div className="p-4 mx-auto bg-white rounded border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Contadores</h2>
      <div className="flex gap-2 mb-4">
        <button
          className={cn(
            "flex items-center gap-1 px-2 py-1 border rounded text-sm bg-white text-gray-700 hover:bg-gray-50"
          )}
          onClick={addCounter}
        >
          <FaPlus /> Nuevo
        </button>
        <button
          className={cn(
            "flex items-center justify-center gap-1 px-2 py-1 border rounded text-sm",
            mostlyActive
              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
              : "bg-gray-50 text-gray-400 border-gray-200"
          )}
          onClick={() => {
            mostlyActive ? desactivateAllCounters() : activateAllCounters();
          }}
          title="Toggle Active"
        >
          {mostlyActive ? "Desactivar todo" : "Activar todo"}
          {mostlyActive ? <FaToggleOn /> : <FaToggleOff />}
        </button>
      </div>
      <div className="space-y-2">
        {counterList.map((counter, idx) => (
          <div
            key={idx}
            className={cn(
              "flex items-center justify-between px-2 py-2 border rounded transition-all animate-fade animate-once animate-duration-300",
              counter.active
                ? "bg-white border-gray-200"
                : "bg-gray-50 border-gray-100 opacity-60"
            )}
          >
            <span
              className={cn(
                "text-base font-medium",
                counter.active ? "text-gray-800" : "text-gray-400"
              )}
            >
              {counter.value}
            </span>
            <div className="flex items-center gap-1">
              <button
                className={cn(
                  "px-2 py-1 rounded border text-xs bg-white text-gray-700 hover:bg-gray-50",
                  !counter.active &&
                    "text-gray-300 border-gray-200 cursor-not-allowed"
                )}
                onClick={() => incrementCounter(idx)}
                disabled={!counter.active}
                title="Increment"
              >
                <FaPlus />
              </button>
              <button
                className={cn(
                  "px-2 py-1 rounded border text-xs bg-white text-gray-700 hover:bg-gray-50",
                  !counter.active &&
                    "text-gray-300 border-gray-200 cursor-not-allowed"
                )}
                onClick={() => decrementCounter(idx)}
                disabled={!counter.active}
                title="Decrement"
              >
                <FaMinus />
              </button>
              <button
                className={cn(
                  "px-2 py-1 rounded border text-xs flex items-center",
                  counter.active
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : "bg-gray-50 text-gray-400 border-gray-200"
                )}
                onClick={() => toggleCounterActive(idx)}
                title="Toggle Active"
              >
                {counter.active ? <FaToggleOn /> : <FaToggleOff />}
              </button>
              <button
                className={cn(
                  "px-2 py-1 rounded border text-xs bg-red-50 text-red-700 hover:bg-red-100 border-red-200"
                )}
                onClick={() => deleteCounter(idx)}
                title="Borrar contador"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
