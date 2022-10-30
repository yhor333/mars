import "./App.css";
import { useEffect } from "react";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const apiRovers =
    "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=udw6I2DT6QJreS6eeLUhtthbxJliPkEJfav0o2kJ";
  useEffect(() => {}, []);
  return (
    <HomePage />

    // <div className="App">
    //   <h1 className="caption">Photos from Mars</h1>
    //   {isShowItem ? (
    //     <Button to="photos">Explore mars</Button>
    //   ) : (
    //     <span>Loading...</span>
    //   )}
    // </div>
  );
}

export default App;
