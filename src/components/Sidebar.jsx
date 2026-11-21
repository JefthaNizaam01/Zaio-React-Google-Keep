import React from "react";

function Sidebar({ isHidden, showingArchived, onSectionChange }) {
  return (
    <aside className={`sidebar${isHidden ? " sidebar-hidden" : ""}`}>
      <nav aria-label="Notes">
        <button
          className={`nav-button${!showingArchived ? " active" : ""}`}
          type="button"
          onClick={() => onSectionChange(false)}
        >
          All notes
        </button>
        <button
          className={`nav-button${showingArchived ? " active" : ""}`}
          type="button"
          onClick={() => onSectionChange(true)}
        >
          Archive
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
