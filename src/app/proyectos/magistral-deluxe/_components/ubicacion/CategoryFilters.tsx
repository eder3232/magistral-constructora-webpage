"use client";

import { cn } from "@/lib/utils";
import { CATEGORIES, FILTER_ALL } from "./constants";
import type { CategoryId } from "./puntos_de_interes";

export type CategoryFilterId = CategoryId | typeof FILTER_ALL;

interface CategoryFiltersProps {
  value: CategoryFilterId;
  onChange: (id: CategoryFilterId) => void;
  className?: string;
}

export function CategoryFilters({
  value,
  onChange,
  className,
}: CategoryFiltersProps) {
  return (
    <div
      className={cn("flex flex-wrap justify-center gap-2", className)}
      role="group"
      aria-label="Filtrar por categoría"
    >
      <button
        type="button"
        onClick={() => onChange(FILTER_ALL)}
        className={cn(
          "flex min-h-[44px] items-center rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
          value === FILTER_ALL
            ? "border-secondary bg-secondary/10 text-secondary"
            : "border-border bg-muted text-muted-foreground hover:opacity-90"
        )}
      >
        Todos
      </button>
      {(Object.keys(CATEGORIES) as CategoryId[]).map((id) => {
        const cat = CATEGORIES[id];
        const isActive = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
              isActive
                ? "border-current bg-current/10 text-inherit"
                : "border-border bg-muted text-muted-foreground hover:opacity-90"
            )}
            style={
              isActive
                ? {
                    borderColor: cat.color,
                    backgroundColor: `${cat.color}18`,
                    color: cat.color,
                  }
                : undefined
            }
          >
            <cat.Icon className="size-4 shrink-0" aria-hidden />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
