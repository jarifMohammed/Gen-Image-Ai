import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import Root from "./Layouts/Root";
import Generate from "./Pages/Generate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root></Root>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="generate" element={<Generate></Generate>}></Route>
      </Route>
    </Routes>
  );
}

export default App;
