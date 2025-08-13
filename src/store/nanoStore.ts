import { atom } from "nanostores";

// Estado: arreglo de contadores con activo/inactivo
export type Counter = {
  value: number;
  active: boolean;
};

export const counters = atom<Counter[]>([
  { value: 0, active: true },
  { value: 0, active: true },
  { value: 0, active: true },
]);

// Función para incrementar un contador por índice
export function incrementCounter(index: number) {
  const arr = counters.get();
  arr[index].value += 1;
  counters.set([...arr]);
}

// Función para decrementar un contador por índice
export function decrementCounter(index: number) {
  const arr = counters.get();
  arr[index].value -= 1;
  counters.set([...arr]);
}

// Función para agregar un nuevo contador
export function addCounter() {
  counters.set([...counters.get(), { value: 0, active: true }]);
}

// Función para alternar el estado activo/inactivo
export function toggleCounterActive(index: number) {
  const arr = counters.get();
  arr[index].active = !arr[index].active;
  counters.set([...arr]);
}

// Función para desactivar todos los contadores
export function desactivateAllCounters() {
  const arr = counters.get();
  arr.forEach((counter) => {
    counter.active = false;
  });
  counters.set([...arr]);
}

// Función para activar todos los contadores
export function activateAllCounters() {
  const arr = counters.get();
  arr.forEach((counter) => {
    counter.active = true;
  });
  counters.set([...arr]);
}

// Funcion para borrar contador
export function deleteCounter(index: number) {
  const arr = counters.get();
  arr.splice(index, 1);
  counters.set([...arr]);
}
