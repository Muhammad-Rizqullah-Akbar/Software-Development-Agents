import { render } from "solid-js/web";
import { ErrorBoundary } from "solid-js";
import "./styles.css";
import "./styles_modal.css";
import { AppRoutes } from "./app/routes";

function AppErrorBoundary(props: { children: any }) {
  return (
    <ErrorBoundary
      fallback={(err, reset) => (
        <div style={{ padding: "48px", "font-family": "sans-serif" }}>
          <h2 style={{ color: "#b3261e" }}>Terjadi error saat memuat aplikasi</h2>
          <pre style={{ background: "#fbe9e7", padding: "16px", "border-radius": "8px", "white-space": "pre-wrap" }}>
            {String(err)}
          </pre>
          <button
            class="btn btn-primary"
            onClick={() => {
              localStorage.removeItem("software-development-agents.db.v2");
              reset();
              location.reload();
            }}
          >
            Reset data demo & muat ulang
          </button>
        </div>
      )}
    >
      {props.children}
    </ErrorBoundary>
  );
}

render(
  () => (
    <AppErrorBoundary>
      <AppRoutes />
    </AppErrorBoundary>
  ),
  document.getElementById("root")!
);
