import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './global.css';

import Firebase from './utils/Firebase';
import FirebaseContext from './utils/FirebaseContext';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseContext.Provider>
)
