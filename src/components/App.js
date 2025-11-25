import React, { useState } from "react";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form() {
  const [description, setNewdescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  function handleSubmit(e) {
    e.preventDefault();

    if(!description)
      return;
    if(!quantity)
      return;

    const newItem = {
      id: initialItems.length + 1,
      description,
      quantity,
      packed: false,
    }

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  function handleQuantity(e){
    setQuantity(e.target.value);
  };


  return (
     <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <input
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button type="submit"> ADD</button>

    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <li key={item.id} >
            {item.description} {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

// function Item () {
//   return(
//     <>
//     {initialItems.map((item) => {
//       <item key={item.id} > {item.quantity} {item.description}</item>
//     })}
//     </>
//   )
// }

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

export default App;
