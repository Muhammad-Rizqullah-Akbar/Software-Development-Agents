import { render } from "solid-js/web";
import "./styles.css";
import "./styles_modal.css";
import { AppRoutes } from "./app/routes";

render(() => <AppRoutes />, document.getElementById("root")!);
