import { createSignal, createMemo, onMount, onCleanup, Show } from "solid-js";
import { render } from "solid-js/web";
import "./styles.css";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { 
  OverviewPage, ProjectsPage, SkillsPage, CicdPage, AgentsPage, 
  BoardPage, SoulPage, ChatPage, CodePage, PreviewPage 
} from "./pages";
import { IconClose, IconPlus, IconCheck } from "./icons";

function App() {
  const [sidebarCompact, setSidebarCompact] = createSignal(false);
  const [modal, setModal] = createSignal<"create_project" | "add_skill" | null>(null);
  const [page, setPage] = createSignal("overview");
  
  // Chat state
  const [chatAgent, setChatAgent] = createSignal("Hermes Researcher");
  const [chatText, setChatText] = createSignal("");
  const [chatMessages, setChatMessages] = createSignal<string[]>(["Halo Eqii. Saya siap membantu proyek ini."]);

  // Modal Form States
  const [newProjectName, setNewProjectName] = createSignal("");
  const [newProjectCategory, setNewProjectCategory] = createSignal("Fullstack SaaS");

  const [newSkillName, setNewSkillName] = createSignal("");
  const [newSkillCategory, setNewSkillCategory] = createSignal("Frontend");

  // Shortcut Keyboard Handler (Ctrl+B)
  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarCompact(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  const activeLabel = createMemo(() => {
    const map: Record<string, string> = {
      overview: "Overview", chat: "Chat Agents", projects: "Projects", board: "Board", pipeline: "Pipeline",
      code: "Code Inspector", preview: "Prototype Preview", cicd: "CI/CD & Hosting",
      agents: "Agent Grid", skills: "Skill Bank", soul: "SOUL Lab", sandbox: "Sandbox",
      members: "Members", invites: "Invites",
    };
    return map[page()] ?? "Overview";
  });

  const sendMessage = () => {
    const text = chatText().trim();
    if (!text) return;
    setChatMessages((old) => [...old, text, `${chatAgent()} menerima instruksi dan memasukkannya ke pipeline.`]);
    setChatText("");
  };

  const handleCreateProjectSubmit = (e: Event) => {
    e.preventDefault();
    if (!newProjectName()) return;
    alert(`Proyek "${newProjectName()}" (${newProjectCategory()}) berhasil dibuat!`);
    setNewProjectName("");
    setModal(null);
    setPage("projects");
  };

  const handleAddSkillSubmit = (e: Event) => {
    e.preventDefault();
    if (!newSkillName()) return;
    alert(`Skill "${newSkillName()}" (${newSkillCategory()}) berhasil ditambahkan ke Skill Bank!`);
    setNewSkillName("");
    setModal(null);
    setPage("skills");
  };

  const pageEl = createMemo(() => {
    switch (page()) {
      case "chat": return <ChatPage agent={chatAgent()} onAgent={setChatAgent} text={chatText()} onText={setChatText} messages={chatMessages()} onSend={sendMessage} />;
      case "projects": return <ProjectsPage onCreateProject={() => setModal("create_project")} />;
      case "skills": return <SkillsPage onOpenAddSkill={() => setModal("add_skill")} />;
      case "cicd": return <CicdPage />;
      case "code": return <CodePage />;
      case "preview": return <PreviewPage />;
      case "agents": return <AgentsPage />;
      case "board": return <BoardPage />;
      case "soul": case "sandbox": return <SoulPage />;
      default: return <OverviewPage onCreateProject={() => setModal("create_project")} onNavigate={(p) => setPage(p)} />;
    }
  });

  return (
    <div class="shell">
      <Sidebar
        open={true}
        compact={sidebarCompact()}
        onClose={() => undefined}
        onToggleCompact={() => setSidebarCompact((v) => !v)}
        active={page()}
        onNavigate={(k) => setPage(k)}
      />
      <div class={`shell-main compact-layout ${sidebarCompact() ? "compact-main" : ""}`}>
        <Topbar 
          page={activeLabel()} 
          onCreateModal={() => setModal("create_project")} 
        />
        <main class="content">
          {pageEl()}
        </main>
      </div>

      {/* MODAL BUAT PROYEK */}
      <Show when={modal() === "create_project"}>
        <div class="modal-backdrop" onClick={() => setModal(null)}>
          <div class="modal-card" onClick={(e) => e.stopPropagation()}>
            <div class="modal-head">
              <h3>Buat Proyek Baru</h3>
              <button class="btn btn-sm btn-ghost" onClick={() => setModal(null)}><IconClose class="ico-sm" /></button>
            </div>
            <form onSubmit={handleCreateProjectSubmit}>
              <div class="modal-body">
                <div class="form-group">
                  <label>Nama Proyek</label>
                  <input 
                    class="form-input" 
                    placeholder="misal: Hermes Mobile Companion" 
                    value={newProjectName()} 
                    onInput={(e) => setNewProjectName(e.currentTarget.value)} 
                    required 
                  />
                </div>
                <div class="form-group">
                  <label>Kategori App</label>
                  <select 
                    class="form-select" 
                    value={newProjectCategory()} 
                    onChange={(e) => setNewProjectCategory(e.currentTarget.value)}
                  >
                    <option value="Fullstack SaaS">Fullstack SaaS</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Backend API">Backend API</option>
                    <option value="Data Pipeline">Data Pipeline</option>
                    <option value="AI Agent Tool">AI Agent Tool</option>
                  </select>
                </div>
              </div>
              <div class="modal-foot">
                <button type="button" class="btn" onClick={() => setModal(null)}>Batal</button>
                <button type="submit" class="btn btn-primary"><IconPlus class="ico-sm" /> Buat Proyek</button>
              </div>
            </form>
          </div>
        </div>
      </Show>

      {/* MODAL TAMBAH SKILL */}
      <Show when={modal() === "add_skill"}>
        <div class="modal-backdrop" onClick={() => setModal(null)}>
          <div class="modal-card" onClick={(e) => e.stopPropagation()}>
            <div class="modal-head">
              <h3>Tambah Skill Baru ke Bank</h3>
              <button class="btn btn-sm btn-ghost" onClick={() => setModal(null)}><IconClose class="ico-sm" /></button>
            </div>
            <form onSubmit={handleAddSkillSubmit}>
              <div class="modal-body">
                <div class="form-group">
                  <label>Nama Skill / Framework</label>
                  <input 
                    class="form-input" 
                    placeholder="misal: Flutter Mobile SDK" 
                    value={newSkillName()} 
                    onInput={(e) => setNewSkillName(e.currentTarget.value)} 
                    required 
                  />
                </div>
                <div class="form-group">
                  <label>Kategori Skill</label>
                  <select 
                    class="form-select" 
                    value={newSkillCategory()} 
                    onChange={(e) => setNewSkillCategory(e.currentTarget.value)}
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Mobile">Mobile</option>
                    <option value="DevTools / Infrastructure">DevTools / Infrastructure</option>
                    <option value="Agent Persona">Agent Persona</option>
                  </select>
                </div>
              </div>
              <div class="modal-foot">
                <button type="button" class="btn" onClick={() => setModal(null)}>Batal</button>
                <button type="submit" class="btn btn-primary"><IconCheck class="ico-sm" /> Simpan Skill</button>
              </div>
            </form>
          </div>
        </div>
      </Show>
    </div>
  );
}

render(() => <App />, document.getElementById("root")!);
