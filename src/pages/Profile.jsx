export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <p>You must be logged in</p>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>
        <p className="profile-undertitle">Make profile changes etc</p>
      </div>
      <div className="profile-card">
        {user.avatar && (
          <img src={user.avatar} alt={user.name} className="profile-avatar" />
        )}
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Role: {user.venueManager ? "Venue Manager" : "Customer"}</p>

        <button>Update Avatar</button>
      </div>
    </div>
  );
}
