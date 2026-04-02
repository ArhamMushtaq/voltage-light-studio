import type { StockStatus } from "@/data/products";
import { cn } from "@/lib/utils";

const config: Record<StockStatus, { label: string; classes: string }> = {
  "in-stock": {
    label: "In Stock",
    classes: "bg-green-500/10 text-green-400 shadow-[0_0_8px_hsl(142_70%_45%/0.3)]",
  },
  "out-of-stock": {
    label: "Out of Stock",
    classes: "bg-muted text-muted-foreground",
  },
  "coming-soon": {
    label: "Coming Soon",
    classes: "bg-yellow-500/10 text-yellow-400 shadow-[0_0_8px_hsl(45_100%_50%/0.3)]",
  },
};

const StockBadge = ({ status }: { status: StockStatus }) => {
  const { label, classes } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        classes
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "in-stock" && "bg-green-400",
          status === "out-of-stock" && "bg-muted-foreground",
          status === "coming-soon" && "bg-yellow-400"
        )}
      />
      {label}
    </span>
  );
};

export default StockBadge;
