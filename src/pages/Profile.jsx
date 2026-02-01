import "./Profile.css";
import { useState } from "react";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [avatarError, setAvatarError] = useState(false);

  if (!user) {
    return <p>You must be logged in</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-top">
        <h1 className="profile-title">My Profile</h1>
        <p className="profile-subtitle">Manage your profile information</p>
      </div>
      <div className="profile-card">
        <div className="profile-avatar-wrapper">
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
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>Role: {user.venueManager ? "Venue Manager" : "Customer"}</p>

          <button className="profile-button">Update Avatar</button>
        </div>
      </div>
    </div>
  );
}
