import "./Profile.css";
import { useState } from "react";

export default function Profile() {
  // get thje logged in user from locStorage
  const user = JSON.parse(localStorage.getItem("user"));
  
  // this is used if the avatar url is broken
  // so that we can show a fallback instead of the broken image icon
  const [avatarError, setAvatarError] = useState(false);

  // if no user is found, block access to the page
  if (!user) {
    return <p>You must be logged in</p>;
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
           {/* this button will later allow the user to update their avatar*/}
          <button className="profile-button">Update Avatar</button>
        </div>
      </div>
    </div>
  );
}
