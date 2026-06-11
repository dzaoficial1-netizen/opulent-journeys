import { createFileRoute } from "@tanstack/react-router";
import HotelsPage from "@/pages/hotels";

export const Route = createFileRoute("/hotels")({
  component: HotelsPage,
});
