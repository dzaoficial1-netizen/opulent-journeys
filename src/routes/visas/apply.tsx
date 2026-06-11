import { createFileRoute } from "@tanstack/react-router";
import VisaApplyPage from "@/pages/visas.apply";

export const Route = createFileRoute("/visas/apply")({
  component: VisaApplyPage,
});
