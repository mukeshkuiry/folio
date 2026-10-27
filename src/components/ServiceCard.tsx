"use client";

import type { ServiceItem } from "@/types/portfolio.interfaces";

export interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard(props: ServiceCardProps) {
  const { service } = props;

  return (
    <div className="majd-service-card">
      <h3 className="majd-h3-card">{service.title}</h3>
      <div className="majd-service-categories">
        <p className="majd-p-body" style={{ color: "var(--ink-muted)" }}>
          {service.category1}
        </p>
        {service.category2 && (
          <>
            <span className="majd-service-dot" aria-hidden="true" />
            <p className="majd-p-body" style={{ color: "var(--ink-muted)" }}>
              {service.category2}
            </p>
          </>
        )}
        {service.category3 && (
          <>
            <span className="majd-service-dot" aria-hidden="true" />
            <p className="majd-p-body" style={{ color: "var(--ink-muted)" }}>
              {service.category3}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
