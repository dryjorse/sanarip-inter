import { Routes, Route } from "react-router-dom";
import { router } from "./router";
import MainLayout from "./layouts/mainLayout/MainLayout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {router.map((route) => (
            <Route {...route} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
