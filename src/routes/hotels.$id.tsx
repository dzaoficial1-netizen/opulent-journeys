import { createFileRoute } from "@tanstack/react-router";
import HotelDetailPage from "@/pages/hotels.$id";

export const Route = createFileRoute("/hotels/$id")({
  component: HotelDetailPage,
});
