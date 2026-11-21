import React, { useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import NoteEditor from "./components/NoteEditor.jsx";
import NoteCard from "./components/NoteCard.jsx";
import EditNoteDialog from "./components/EditNoteDialog.jsx";

// Keep notes saved here so they are still there after a refresh.
function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("keep-notes") || "[]");

  return savedNotes.map((note) => ({
    ...note,
    id: note.id || crypto.randomUUID(),
    archived: Boolean(note.archived),
  }));
}

function App() {
  const [notes, setNotes] = useState(loadNotes);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [reminder, setReminder] = useState("");
  const [searchText, setSearchText] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("keep-theme") || "light");
  const [showingArchived, setShowingArchived] = useState(false);
  const [isListView, setIsListView] = useState(false);
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const [editReminder, setEditReminder] = useState("");
  const noteTextRef = useRef(null);

  const editingNote = notes.find((note) => note.id === editingNoteId);
  const normalizedSearch = searchText.toLowerCase();
  // Pinned notes stay at the top after filtering.
  const shownNotes = notes
    .filter((note) => {
      const matchesSection = note.archived === showingArchived;
      const matchesSearch =
        note.title.toLowerCase().includes(normalizedSearch) ||
        note.text.toLowerCase().includes(normalizedSearch);
      return matchesSection && matchesSearch;
    })
    .sort((first, second) => Number(Boolean(second.pinned)) - Number(Boolean(first.pinned)));

  function saveNotes(updatedNotes) {
    setNotes(updatedNotes);
    localStorage.setItem("keep-notes", JSON.stringify(updatedNotes));
  }

  function clearInput() {
    setTitle("");
    setText("");
    setReminder("");
  }

  function openNoteEditor(note) {
    setEditTitle(note.title);
    setEditText(note.text);
    setEditReminder(note.reminder || "");
    setEditingNoteId(note.id);
  }

  function changeTheme() {
    // Save the theme too, so it stays the way the user picked.
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("keep-theme", newTheme);
  }

  function handleAddNote(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedText = text.trim();

    if (!trimmedTitle && !trimmedText) {
      noteTextRef.current?.focus();
      return;
    }

    saveNotes([
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        text: trimmedText,
        reminder,
        pinned: false,
        archived: false,
      },
      ...notes,
    ]);
    clearInput();
    setShowingArchived(false);
  }

  function handleEditNote(event) {
    event.preventDefault();
    if (!editingNote) return;

    saveNotes(
      notes.map((note) =>
        note.id === editingNote.id
          ? {
              ...note,
              title: editTitle.trim(),
              text: editText.trim(),
              reminder: editReminder,
            }
          : note,
      ),
    );
    setEditingNoteId(null);
  }

  function toggleArchive(note) {
    saveNotes(
      notes.map((currentNote) =>
        currentNote.id === note.id
          ? { ...currentNote, archived: !currentNote.archived }
          : currentNote,
      ),
    );
  }

  function togglePin(note) {
    saveNotes(
      notes.map((currentNote) =>
        currentNote.id === note.id
          ? { ...currentNote, pinned: !currentNote.pinned }
          : currentNote,
      ),
    );
  }

  function deleteNote(note) {
    saveNotes(notes.filter((currentNote) => currentNote.id !== note.id));
  }

  return (
    <div className={`app ${theme}`}>
      <Header
        searchText={searchText}
        onSearchChange={setSearchText}
        theme={theme}
        onThemeChange={changeTheme}
        onRefresh={() => setNotes(loadNotes())}
        isListView={isListView}
        onLayoutChange={() => setIsListView((listView) => !listView)}
        onMenuClick={() => setIsSidebarHidden((hidden) => !hidden)}
      />

      <div className="page-content">
        <Sidebar
          isHidden={isSidebarHidden}
          showingArchived={showingArchived}
          onSectionChange={setShowingArchived}
        />

        <main>
          <NoteEditor
            title={title}
            text={text}
            reminder={reminder}
            onTitleChange={setTitle}
            onTextChange={setText}
            onReminderChange={setReminder}
            onSubmit={handleAddNote}
            onClear={clearInput}
            noteTextRef={noteTextRef}
          />

          <h2 className="list-heading">{showingArchived ? "Archive" : "All notes"}</h2>
          {/* React redraws this list whenever notes or search changes. */}
          <section className={`note-list${isListView ? " list-view" : ""}`} aria-label="Your notes">
            {shownNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                showingArchived={showingArchived}
                onEdit={openNoteEditor}
                onPin={togglePin}
                onArchive={toggleArchive}
                onDelete={deleteNote}
              />
            ))}
          </section>
          {shownNotes.length === 0 && (
            <p className="empty-message">
              {normalizedSearch ? "No notes found." : "Your notes will show up here."}
            </p>
          )}
        </main>
      </div>

      <EditNoteDialog
        note={editingNote}
        title={editTitle}
        text={editText}
        reminder={editReminder}
        onTitleChange={setEditTitle}
        onTextChange={setEditText}
        onReminderChange={setEditReminder}
        onSave={handleEditNote}
        onClose={() => setEditingNoteId(null)}
      />
    </div>
  );
}

export default App;
