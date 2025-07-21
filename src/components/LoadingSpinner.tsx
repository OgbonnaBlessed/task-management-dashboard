import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const LoadingSpinner = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center min-h-[300px] animate-fade-in", className)}>
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
    </div>
);