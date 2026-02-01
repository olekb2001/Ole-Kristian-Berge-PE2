import "./Profile.css";
import { useState } from "react";
import { updateAvatar } from "../api/profile";

export default function Profile() {
  // get the logged in user from locStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // states which are used for the avatar update
  const [avatarError, setAvatarError] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [message, setMessage] = useState("");

  // if no user is found, block access to the page
  if (!user) {
    return <p>You must be logged in</p>;
  }
  //  handles sending the new avatar url to the api
  async function handleTheAvatarUpdate() {
    try {
      const updatedProfile = await updateAvatar(newAvatar);
      user.avatar = updatedProfile.avatar.url;
      localStorage.setItem("user", JSON.stringify(user));

      setAvatarError(false);
      setNewAvatar("");
      setMessage("Avatar updated");
      setEditing(false);
      //refresh the ui to show the avatar everywhere
      window.location.reload();
    } catch (err) {
      setMessage(err.message);
    }
  }

  return (
    <div className="profile-page">
      {/* page header*/}
      <div className="profile-top">
        <h1 className="profile-title">My Profile</h1>
        <p className="profile-subtitle">Manage your profile information</p>
      </div>
      {/* main profile card*/}
      <div className="profile-card">
        {/* avatar section*/}
        <div className="profile-avatar-wrapper">
          {/*
            If the user has an avatar and it loads correctly,
            show the image. If it fails to load, show a placeholder
            with the first letter of the users name.
          */}
          {user.avatar && !avatarError ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="profile-avatar-img"
              onError={() => setAvatarError(true)}
            />
          ) : (
            <span className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        {/* user information*/}
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>Role: {user.venueManager ? "Venue Manager" : "Customer"}</p>
          {editing ? (
            <>
              <input
                type="text"
                placeholder="Paste image Url...."
                value={newAvatar}
                onChange={(e) => setNewAvatar(e.target.value)}
              />
              <button
                onClick={handleTheAvatarUpdate}
                className="profile-button"
              >
                Save Avatar
              </button>
            </>
          ) : (
            <button className="profile-button" onClick={() => setEditing(true)}>
              Update Avatar
            </button>
          )}
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
}
