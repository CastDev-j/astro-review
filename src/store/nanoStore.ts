import { atom } from "nanostores";

export type IsLoading = boolean;

export const isLoading = atom<IsLoading>(true);

// Estado: arreglo de contadores con activo/inactivo
export type Counter = {
  id: number;
  value: number;
  active: boolean;
};

export const counters = atom<Counter[]>([]);

export const loadCounters = async () => {
  isLoading.set(true);
  const response = await fetch("/api/counters");
  const data = await response.json();

  isLoading.set(false);
  counters.set(data.counters);
};

// Función para incrementar un contador por índice de forma asíncrona
export async function incrementCounter(index: number) {
  const counter = counters.get().find((c) => c.id === index)!;

  const response = await fetch(`/api/counters`, {
    method: "PUT",
    body: JSON.stringify({
      index,
      value: counter.value + 1,
      active: counter.active,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  counters.set(data.counters);
}

// Función para decrementar un contador por índice de forma asíncrona
export async function decrementCounter(index: number) {
  const counter = counters.get().find((c) => c.id === index)!;

  const response = await fetch(`/api/counters`, {
    method: "PUT",
    body: JSON.stringify({
      index,
      value: counter.value - 1,
      active: counter.active,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  counters.set(data.counters);
}

// Función para agregar un nuevo contador de forma asíncrona
export async function addCounter() {
  const response = await fetch(`/api/counters`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  counters.set(data.counters);
}

// Función para alternar el estado activo/inactivo de forma asíncrona
export async function toggleCounterActive(index: number) {
  const counter = counters.get().find((c) => c.id === index)!;
  const response = await fetch(`/api/counters`, {
    method: "PUT",
    body: JSON.stringify({
      index,
      value: counter.value,
      active: !counter.active,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  counters.set(data.counters);
}

// Funcion para borrar contador de forma asíncrona
export async function deleteCounter(index: number) {
  const response = await fetch(`/api/counters`, {
    method: "DELETE",
    body: JSON.stringify({ index }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  counters.set(data.counters);
}

// Función para desactivar todos los contadores de forma asíncrona
export async function desactivateAllCounters() {
  const response = await fetch(`/api/counters/global`, {
    method: "PUT",
    body: JSON.stringify({ active: false }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  counters.set(data.counters);
}

// Función para activar todos los contadores de forma asíncrona
export async function activateAllCounters() {
  const response = await fetch(`/api/counters/global`, {
    method: "PUT",
    body: JSON.stringify({ active: true }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();

  counters.set(data.counters);
}
