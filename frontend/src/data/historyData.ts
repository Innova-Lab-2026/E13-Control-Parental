
import type { HistoryVariant } from "../components/historial/HistoryCard";

export type HistoryEvent = {
  id: string;
  variant: HistoryVariant;
  title: string;
  description: string;
  time: string;
  device: string;
  category: "blocked" | "security" | "settings";
  date: string;
};

export const historyData: HistoryEvent[] = [
  {
    id: "1",
    variant: "blocked",
    title: "Sitio web bloqueado",
    description: "Se bloqueó el acceso a un sitio web.",
    time: "10:42",
    device: "Celular de prueba",
    category: "blocked",
    date: "Hoy",
  },
  {
    id: "2",
    variant: "alert",
    title: "Intento de acceso bloqueado",
    description: "Se detectó un intento de acceso restringido.",
    time: "10:15",
    device: "Celular de prueba",
    category: "security",
    date: "Hoy",
  },
  {
    id: "3",
    variant: "settings",
    title: "Configuración actualizada",
    description: "Se modificaron los ajustes de protección.",
    time: "09:30",
    device: "Perfil familiar",
    category: "settings",
    date: "Hoy",
  },
  {
    id: "4",
    variant: "protected",
    title: "Protección activada",
    description: "La protección está activa en el dispositivo.",
    time: "Ayer · 18:20",
    device: "Celular de prueba",
    category: "security",
    date: "Ayer",
  },
];
