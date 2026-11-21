import React, { useEffect, useRef } from "react";

function EditNoteDialog({
  note,
  title,
  text,
  reminder,
  onTitleChange,
  onTextChange,
  onReminderChange,
  onSave,
  onClose,
}) {
  const dialogRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (note && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      titleRef.current?.focus();
    }
  }, [note]);

  return (
    <dialog
      className="edit-dialog"
      ref={dialogRef}
      aria-labelledby="edit-dialog-heading"
      onClose={onClose}
    >
      <form className="note-editor edit-note-form" onSubmit={onSave}>
        <h2 id="edit-dialog-heading">Edit note</h2>
        <label className="visually-hidden" htmlFor="edit-title">
          Title
        </label>
        <input
          ref={titleRef}
          id="edit-title"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
        />
        <label className="visually-hidden" htmlFor="edit-note">
          Note
        </label>
        <textarea
          id="edit-note"
          placeholder="Take a note..."
          rows="5"
          value={text}
          onChange={(event) => onTextChange(event.target.value)}
        />
        <label className="reminder-field" htmlFor="edit-reminder">
          Reminder
          <input
            id="edit-reminder"
            type="datetime-local"
            value={reminder}
            onChange={(event) => onReminderChange(event.target.value)}
          />
        </label>
        <div className="form-buttons">
          <button className="add-button" type="submit">
            Save
          </button>
          <button className="text-button" type="button" onClick={() => dialogRef.current?.close()}>
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default EditNoteDialog;
