"use client";

import type { ServiceItem } from "@/types/portfolio.interfaces";
import { motion } from "framer-motion";

export interface ServiceCardProps {
  service: ServiceItem;
}

export function ServiceCard(props: ServiceCardProps) {
  const { service } = props;

  return (
    <motion.div
      className="majd-service-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        type: "spring",
        bounce: 0,
        delay: 0.2,
        duration: 1.6,
      }}
    >
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
    </motion.div>
  );
}
