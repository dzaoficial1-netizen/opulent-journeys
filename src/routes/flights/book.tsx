import { createFileRoute } from "@tanstack/react-router";
import FlightBookPage from "@/pages/flights.book";

export const Route = createFileRoute("/flights/book")({
  component: FlightBookPage,
});
