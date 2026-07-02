// src/utils/toast.js
// Centralized toast utility — poori app mein yahi import karo
// alert() aur confirm() dono replace kar deta hai

import { toast } from "react-toastify";

// ── Simple toasts ──────────────────────────────────────
export const showSuccess = (msg) =>
  toast.success(msg, { position: "top-center", autoClose: 3000 });

export const showError = (msg) =>
  toast.error(msg, { position: "top-center", autoClose: 4000 });

export const showInfo = (msg) =>
  toast.info(msg, { position: "top-center", autoClose: 3000 });

export const showWarn = (msg) =>
  toast.warn(msg, { position: "top-center", autoClose: 3500 });

// ── Confirm dialog (window.confirm ka replacement) ────
// Promise return karta hai — true = confirm, false = cancel
export const showConfirm = (msg) =>
  new Promise((resolve) => {
    toast(
      ({ closeToast }) => (
        <div style={{ fontFamily: "inherit" }}>
          <p style={{ margin: "0 0 12px", fontSize: "14px", color: "#0e132f" }}>
            {msg}
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button
              onClick={() => { resolve(false); closeToast(); }}
              style={{
                padding: "6px 14px", borderRadius: "8px", border: "1.5px solid #e5e7eb",
                background: "#fff", cursor: "pointer", fontSize: "13px", color: "#374151",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => { resolve(true); closeToast(); }}
              style={{
                padding: "6px 14px", borderRadius: "8px", border: "none",
                background: "#b5651d", color: "#fff", cursor: "pointer", fontSize: "13px",
                fontWeight: "600",
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  });