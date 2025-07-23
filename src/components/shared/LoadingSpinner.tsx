import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const LoadingSpinner = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "absolute inset-0 z-[9999] flex items-center justify-center bg-black/50",
      className
    )}
  >
    <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
  </div>
);