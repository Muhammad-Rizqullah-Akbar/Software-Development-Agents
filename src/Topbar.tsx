import { IconSearch, IconPlus } from "./icons";

export function Topbar(props: { page: string; onCreateModal: () => void }) {
  return (
    <header class="topbar">
      <div class="tb-crumb">
        <span class="tb-workspace">Hermes Console</span>
        <span class="tb-page">/ {props.page}</span>
      </div>

      <span class="tb-env">staging</span>

      <div class="tb-spacer" />

      <div class="tb-search">
        <IconSearch class="ico-sm" />
        <span>Cari agent, skill, task</span>
        <kbd style={{ "margin-left": "auto" }}>Ctrl+B (toggle sidebar)</kbd>
      </div>

      <button class="btn btn-sm btn-primary" onClick={props.onCreateModal}>
        <IconPlus class="ico-sm" />
        Buat Proyek
      </button>
    </header>
  );
}
