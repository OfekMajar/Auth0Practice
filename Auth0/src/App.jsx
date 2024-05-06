import "./App.css";

import LogoutButton from "./components/LogoutButton";
import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { baseUrl } from "./baseURL";

function App() {
  const { isLoading, error, getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const res = await axios.get(`${baseUrl}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const callProtectApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("Access token:", token);
      const res = await axios.get(`${baseUrl}/protected`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data.message || error.message);
    }
  };

  return (
    <main>
      <h1>auth0 Login</h1>
      {error && <p>authentication error</p>}
      {!error && isLoading && <p>loading..</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <LogoutButton />
          <Profile />
          <ul>
            <li>
              <button onClick={callApi}>call api</button>
            </li>
            <li>
              <button onClick={callProtectApi}>call protect api</button>
            </li>
          </ul>
        </>
      )}
    </main>
  );
}

export default App;
