// GroceryList.tsx
import React, { useState } from 'react';
import './GroceryList.css';
import SideBar from "./SideBar.tsx";

interface GroceryItem {
  id: number;
  name: string;
  measurement: string;
  checked: boolean;
}

const GroceryList: React.FC = () => {
    const [items, setItems] = useState<GroceryItem[]>([
        { id: 1, name: 'Pepperoni', measurement: '1/2 cup, sliced', checked: false },
        { id: 2, name: 'Milk', measurement: '1 liter', checked: false },
        { id: 3, name: 'Bread', measurement: '1 loaf', checked: false },
        { id: 4, name: 'All-purpose flour', measurement: '2 1/4 cups', checked: false },
        { id: 5, name: 'Salt', measurement: '1 tsp', checked: false },
        { id: 6, name: 'Sugar', measurement: '1 tsp', checked: false },
        { id: 7, name: 'Olive oil', measurement: '1 tbsp', checked: false },
        { id: 8, name: 'Active dry yeast', measurement: '1 packet (2 1/4 tsp)', checked: false },
        { id: 9, name: 'Warm water', measurement: '3/4 cup', checked: false },
        { id: 10, name: 'Crushed tomatoes', measurement: '1 cup', checked: false },
        { id: 11, name: 'Garlic clove', measurement: '1, minced', checked: false },
        { id: 12, name: 'Dried oregano', measurement: '1 tsp', checked: false },
        { id: 13, name: 'Dried basil', measurement: '1 tsp', checked: false },
        { id: 14, name: 'Mozzarella cheese', measurement: '1 1/2 cups', checked: false },
        { id: 15, name: 'Fresh basil leaves', measurement: 'optional', checked: false },
      ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemMeasurement, setNewItemMeasurement] = useState('');


  const handleEdit = (id: number, name: string, measurement: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, name, measurement } : item
    );
    setItems(updatedItems);
  };

  const handleToggle = (id: number) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    if (!newItemName || !newItemMeasurement) return;
    const newItem: GroceryItem = {
      id: items.length + 1,
      name: newItemName,
      measurement: newItemMeasurement,
      checked: false,
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemMeasurement('');
  };

  return (
    <div className="grocery-list-container">
      <div className="list-container">
        <SideBar/>
        <h2>Grocery List</h2>
        <ul className="grocery-list">
          {items.map((item) => (
            <GroceryListItem
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      </div>

      <div className="add-item-container">
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Measurement"
          value={newItemMeasurement}
          onChange={(e) => setNewItemMeasurement(e.target.value)}
          className="input-field"
        />
        <button onClick={handleAddItem} className="add-item-btn">
          Add Item
        </button>
      </div>
    </div>
  );
};
interface GroceryListItemProps {
    item: GroceryItem;
    onEdit: (id: number, name: string, measurement: string) => void;
    onToggle: (id: number) => void;
}

const GroceryListItem: React.FC<GroceryListItemProps> = ({ item, onEdit, onToggle }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(item.name);
    const [newMeasurement, setNewMeasurement] = useState(item.measurement);
  
    const handleEditToggle = () => {
      if (isEditing) {
        onEdit(item.id, newName, newMeasurement);
      }
      setIsEditing(!isEditing);
    };
  
    return (
        
      <li className={`grocery-item ${item.checked ? 'checked' : ''}`}>
         {!isEditing && (
                <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => onToggle(item.id)}
                    className="checkbox"
                />
            )}
        {isEditing ? (
          <div className="edit-mode">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="edit-input"
            />
            <input
              type="text"
              value={newMeasurement}
              onChange={(e) => setNewMeasurement(e.target.value)}
              className="edit-input"
            />
          </div>
        ) : (
          <div className="display-mode">
            <span className="item-name">{item.name}</span>
            <span className="item-measurement">{item.measurement}</span>
          </div>
        )}
        <button onClick={handleEditToggle} className="edit-btn">
                {isEditing ? 'Save' : 'Edit'}
            </button>
      </li>
    );
  };
  
  export default GroceryList;