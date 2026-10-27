"use client";

import { RollingText } from "@/components/RollingText";

export type FormButtonVariant = "default" | "loading" | "disabled" | "success" | "error";

export interface FormButtonProps {
  variant?: FormButtonVariant;
  label?: string;
}

export function FormButton(props: FormButtonProps) {
  const { variant = "default", label = "Submit" } = props;

  const isDisabled = variant === "disabled" || variant === "loading";
  const isError = variant === "error";

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={`majd-form-btn${isError ? " is-error" : ""}`}
    >
      {variant === "loading" && (
        <span
          className="animate-spin-conic"
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg at 50% 50%, rgba(17, 17, 17, 0) 10deg, #111111 340deg)",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 0)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 0)",
          }}
          aria-label="Submitting"
        />
      )}
      {variant === "success" && (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#111111"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-label="Submitted"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
      {(variant === "default" || variant === "disabled" || variant === "error") && (
        <RollingText
          text={isError ? "An error occurred." : label}
          color={isError ? "#eb4d6d" : "#111111"}
          padding="8px 16px"
        />
      )}
    </button>
  );
}
