import React from "react";

function NoteEditor({
  title,
  text,
  reminder,
  onTitleChange,
  onTextChange,
  onReminderChange,
  onSubmit,
  onClear,
  noteTextRef,
}) {
  return (
    <form className="note-editor" onSubmit={onSubmit}>
      <label className="visually-hidden" htmlFor="title">
        Title
      </label>
      <input
        id="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
      />
      <label className="visually-hidden" htmlFor="note">
        Take a note...
      </label>
      <textarea
        ref={noteTextRef}
        id="note"
        placeholder="Take a note..."
        rows="3"
        value={text}
        onChange={(event) => onTextChange(event.target.value)}
      />
      <label className="reminder-field" htmlFor="reminder">
        Reminder
        <input
          id="reminder"
          type="datetime-local"
          value={reminder}
          onChange={(event) => onReminderChange(event.target.value)}
        />
      </label>
      <div className="form-buttons">
        <button className="add-button" type="submit">
          Add note
        </button>
        <button className="text-button" type="button" onClick={onClear}>
          Clear
        </button>
      </div>
    </form>
  );
}

export default NoteEditor;
