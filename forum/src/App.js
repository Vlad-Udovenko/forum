import React from 'react'
import UseRouts from './routes';
import {useAuth} from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext';
import Loader from './components/Loader/Loader'





function App() {
  const{token, login, logout, userId, ready} = useAuth();
  const isAuthenticated = !!token;

  if(!ready){
    return <Loader/>
  }
  return (
    <AuthContext.Provider value={{token, login, logout, userId}}>
      <div className="App">
        <UseRouts isAuthenticated={isAuthenticated}/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
