import React from "react";
import useMoveable from "./hooks/useMoveable";
import {Box} from "./components/Box";

const App = () => {
    const { moveableComponents, addMoveable, updateMoveable, deleteMoveable, handleSelected, selected, handleResizeStart } = useMoveable();

  return (
      <main style={{ height: "100vh", width: "100vw" }}>
        <button onClick={addMoveable}>Add Moveable</button>
        <div
            id="parent"
            style={{
              position: "relative",
              background: "black",
              height: "80vh",
              width: "80vw",
              overflow: "hidden",
            }}
        >
          {moveableComponents.map((item, index) => (
              <Box
                  {...item}
                  key={index}
                  updateMoveable={updateMoveable}
                  handleResizeStart={handleResizeStart}
                  setSelected={handleSelected}
                  isSelected={selected === item.id}
                  deleteMoveable={deleteMoveable}
              />
          ))}
        </div>
      </main>
  );
};

export default App;
