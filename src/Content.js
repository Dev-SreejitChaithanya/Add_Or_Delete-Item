import React from "react";

import ItemList from "./ItemList";
function Content({ items, handleCheck, handleDelete }) {
  return (
    <main>
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p style={{ color: "red", marginTop: "2rem" }}>No item</p>
      )}
    </main>
  );
}

export default Content;
