import React from "react";

export default function SummaryButton({ onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.button,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        marginTop: "1.5rem",
        width: "100%",
      }}
    >
      Send Summary to Slack
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    padding: "12px",
    fontSize: "1.1rem",
    borderRadius: 6,
    fontWeight: "700",
    transition: "background-color 0.3s ease",
  },
};
