import React from "react";

function NoteCard({ note, showingArchived, onEdit, onPin, onArchive, onDelete }) {
  const reminderIsOverdue = note.reminder && new Date(note.reminder) < new Date();

  return (
    <article className="note-card">
      <button
        className="note-card-content"
        type="button"
        aria-label={`Edit note: ${note.title || "Untitled"}`}
        onClick={() => onEdit(note)}
      >
        <h3>{note.title || "Untitled"}</h3>
        <p>{note.text}</p>
      </button>
      {note.reminder && (
        <p className={`note-reminder${reminderIsOverdue ? " overdue" : ""}`}>
          Reminder: {new Date(note.reminder).toLocaleString()}
        </p>
      )}
      <div className="note-actions">
        <button className="text-button" type="button" onClick={() => onPin(note)}>
          {note.pinned ? "Unpin" : "Pin"}
        </button>
        <button
          className="text-button"
          type="button"
          title={showingArchived ? "Move note to all notes" : "Move note to archive"}
          onClick={() => onArchive(note)}
        >
          {showingArchived ? "Unarchive" : "Archive"}
        </button>
        <button className="text-button delete-button" type="button" onClick={() => onDelete(note)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
