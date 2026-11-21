import React from "react";

const iconPath = (name) => `/assets/${name}-icon.svg`;

function Header({
  searchText,
  onSearchChange,
  theme,
  onThemeChange,
  onRefresh,
  isListView,
  onLayoutChange,
  onMenuClick,
}) {
  return (
    <header className="top-bar">
      <button
        className="icon-button menu-button"
        type="button"
        aria-label="Toggle menu"
        title="Menu"
        onClick={onMenuClick}
      >
        <img src={iconPath("menu")} alt="" />
      </button>
      <img className="logo" src="/assets/google-keep.png" alt="Google Keep" />
      <h1>Keep</h1>

      <label className="search-box">
        <img src={iconPath("search")} alt="" />
        <input
          type="search"
          placeholder="Search"
          aria-label="Search notes"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>

      <div className="top-bar-actions">
        <button
          className="theme-button"
          type="button"
          onClick={onThemeChange}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
        <button
          className="icon-button"
          type="button"
          aria-label="Refresh notes"
          title="Refresh"
          onClick={onRefresh}
        >
          <img src={iconPath("refresh")} alt="refresh-icon" />
        </button>
        <button
          className="icon-button"
          type="button"
          aria-label="Toggle notes layout"
          aria-pressed={isListView}
          title="Toggle notes layout"
          onClick={onLayoutChange}
        >
          <img src={iconPath("grid")} alt="grid-icon" />
        </button>
        <button className="icon-button" type="button" aria-label="Settings" title="Settings">
          <img src={iconPath("settings")} alt="settings-icon" />
        </button>
        <button className="icon-button" type="button" aria-label="Google apps" title="Google apps">
          <img src={iconPath("apps")} alt="apps-icon" />
        </button>
        <button
          className="icon-button profile-button"
          type="button"
          aria-label="Google account"
          title="Google account"
        >
          <img src={iconPath("profile")} alt="profile-icon" />
        </button>
      </div>
    </header>
  );
}

export default Header;
