import React from "react";
import useMoveable from "./hooks/useMoveable";
import {Box} from "./components/Box";
import styles  from './styles/ui/Container/Contianer.module.css';

import {Button} from './components/ui'

const App = () => {
    const { moveableComponents, addMoveable, updateMoveable, deleteMoveable, handleSelected, selected, handleResizeStart } = useMoveable();

  return (
      <main className={styles.container}>
        <Button onClick={addMoveable} text='Add Moveable +' />
        <div
            id="parent"
            className={styles.box}
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
