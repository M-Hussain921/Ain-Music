import { BrowserRouter } from "react-router-dom";
import { AppRoute } from "./Routes/App.Route.jsx";
import { AuthModalProvider } from "./context/AuthModalContext.jsx";
import { GlobalAuthModal } from "./components/GlobalAuthModal.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthModalProvider>
        <AppRoute />
        <GlobalAuthModal />
      </AuthModalProvider>
    </BrowserRouter>
  );
}

export default App;