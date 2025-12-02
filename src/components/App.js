import React, { useState } from "react";


import Logo from "./Logo.js";

const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
  { id: 3, description: "Socks", quantity: 12, packed: true },
];

function Form({ description, onNewDescription, quantity, onNewQuantity, onAddItems }) {
  function handleSubmit(e) {
    e.preventDefault();

    if (!description || quantity <= 0) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };

    onAddItems(newItem);

    onNewDescription("");
    onNewQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>

      <select
        value={quantity}
        onChange={(e) => onNewQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => onNewDescription(e.target.value)}
      />

      <button>ADD</button>
    </form>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span>
        {item.quantity} {item.description} 
      </span>
      <button onClick={() => onDeleteItem(item.id)}> X </button>
    </li>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Delete Everything </button>
      </div>
    </div>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <>Start adding some items</>
      </footer>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <>
        {percentage === 100
          ? "You got everything!"
          : `You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleAddItems(item) {
    setItems((currentItems) => [...currentItems, item]);
  }

  function handleDeleteItem(id) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = alert.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form
        description={description}
        onNewDescription={setDescription}
        quantity={quantity}
        onNewQuantity={setQuantity}
        onAddItems={handleAddItems}
      />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;