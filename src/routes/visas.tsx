import { createFileRoute } from "@tanstack/react-router";
import VisasPage from "@/pages/visas";

export const Route = createFileRoute("/visas")({
  component: VisasPage,
});
