"use client";

import { useState, useMemo } from "react";
import { MapPin } from "lucide-react";
import { CategoryFilters, type CategoryFilterId } from "./CategoryFilters";
import { MapSection } from "./MapSection";
import { POIList } from "./POIList";
import { StatsCards } from "./StatsCards";
import { FILTER_ALL } from "./constants";
import { POIS } from "./puntos_de_interes";
import type { ProjectData } from "./tipos";
import projectDataJson from "./ubicacion_proyecto.json";
import "./ubicacion-section.css";

const projectData = projectDataJson as ProjectData;

export function UbicacionSection() {
    const [filterId, setFilterId] = useState<CategoryFilterId>(FILTER_ALL);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const filteredPois = useMemo(() => {
        if (filterId === FILTER_ALL) return POIS;
        return POIS.filter((p) => p.category === filterId);
    }, [filterId]);

    return (
        <section
            id="ubicacion"
            aria-label="Ubicación"
            className="ubicacion-section relative overflow-hidden bg-background py-16 md:py-24 lg:py-32"
        >
            <div className="mx-auto max-w-6xl px-4 md:px-8 lg:px-16">
                {/* Header */}
                <div className="mb-8 text-center md:mb-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-secondary">
                        <MapPin className="size-3" aria-hidden />
                        Ubicación
                    </span>
                    <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                        Una ubicación{" "}
                        <span className="text-secondary">estratégica</span>
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
                        Conectado con todo lo que necesitas. A pasos de centros comerciales,
                        colegios y servicios en Cayma.
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {POIS.length}+ puntos de interés en el radio
                    </p>
                </div>

                {/* Filtros de categoría */}
                <CategoryFilters
                    value={filterId}
                    onChange={(id) => {
                        setFilterId(id);
                        setHoveredId(null);
                    }}
                />

                {/* Mapa + Lista */}
                <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
                    <div className="h-[320px] min-h-[320px] md:h-[400px] lg:h-[456px]">
                        <MapSection
                            project={projectData}
                            pois={POIS}
                            filteredPois={filteredPois}
                            hoveredId={hoveredId}
                            onHoverChange={setHoveredId}
                            className="h-full"
                        />
                    </div>
                    <div className="min-h-0">
                        <POIList
                            pois={filteredPois}
                            hoveredId={hoveredId}
                            onHoverChange={setHoveredId}
                        />
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-8">
                    <StatsCards pois={POIS} />
                </div>
            </div>
        </section>
    );
}