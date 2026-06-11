import { createFileRoute } from "@tanstack/react-router";
import FlightsPage from "@/pages/flights";

export const Route = createFileRoute("/flights")({
  component: FlightsPage,
});
