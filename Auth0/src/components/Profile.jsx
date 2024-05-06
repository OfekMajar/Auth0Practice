import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div>
        <h1>{user.name}</h1>
        <img src={user.picture} alt="" />
        <p>{JSON.stringify(user)}</p>
      </div>
    )
  );
}

export default Profile;
