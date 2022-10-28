import { useEffect } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import { addRovers } from "./store/reduser/apiSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const apiRovers =
    "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=udw6I2DT6QJreS6eeLUhtthbxJliPkEJfav0o2kJ";
  useEffect(() => {
    fetch(apiRovers)
      .then((res) => res.json())
      .then((res) => dispatch(addRovers(res)));
  }, [dispatch]);
  return (
    <div className="App">
      <h1 className="caption">Photos from Mars</h1>
      <Button to="photos" class={"enter"}>
        Explore mars
      </Button>
    </div>
  );
}

export default App;
