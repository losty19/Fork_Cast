// GroceryList.tsx
import React, { useState, useEffect } from 'react';
import './GroceryList.css';
import SideBar from "./SideBar.tsx";
import Select from 'react-select';
import { toPng } from 'html-to-image';

interface GroceryItem {
  id: number;
  name: string;
  quantity: number;
  measurement: string;
  checked: boolean;
}

const defaultItems: GroceryItem[] = [];

const GroceryList: React.FC = () => {
    const [items, setItems] = useState<GroceryItem[]>(() => {
        const stored = localStorage.getItem('groceryItems');
        return stored ? JSON.parse(stored) : defaultItems;
    });
    const [newItemName, setNewItemName] = useState('');
    const [newItemMeasurement, setNewItemMeasurement] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState('');

    const measurementOptions = [
      { value: 'cup', label: 'Cup' },
      { value: 'tablespoon', label: 'Tablespoon' },
      { value: 'teaspoon', label: 'Teaspoon' },
      { value: 'pint', label: 'Pint' },
      { value: 'quart', label: 'Quart' },
      { value: 'liter', label: 'Liter' },
      { value: 'gram', label: 'Gram' },
      { value: 'kilogram', label: 'Kilogram' },
      { value: 'ounce', label: 'Ounce' },
      { value: 'pound', label: 'Pound' },
      { value: 'slice', label: 'Slice' },
      { value: 'piece', label: 'Piece' },
    ];

    useEffect(() => {
        localStorage.setItem('groceryItems', JSON.stringify(items));
    }, [items]);

    const handleEdit = (id: number, name: string, quantity: number, measurement: string) => {
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, name, quantity, measurement } : item
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
        const quantity = parseFloat(newItemQuantity);
        if (!newItemName || !newItemMeasurement || isNaN(quantity)) return;
        const newItem: GroceryItem = {
            id: items.length + 1,
            name: newItemName,
            quantity: quantity,
            measurement: newItemMeasurement,
            checked: false,
        };
        setItems([...items, newItem]);
        setNewItemName('');
        setNewItemMeasurement('');
        setNewItemQuantity('');
    };

    const handleClear = () => {
        setItems([]);
    };

    // Add delete handler
    const handleDelete = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const handleExportToImage = () => {
      const listContainer = document.querySelector('.list-container') as HTMLElement;
      const editButtons = document.querySelectorAll('.edit-btn') as NodeListOf<HTMLElement>;

      editButtons.forEach((button) => (button.style.display = 'none'));

      if (listContainer) {
          toPng(listContainer)
              .then((dataUrl) => {
                  const link = document.createElement('a');
                  link.download = 'grocery-list.png';
                  link.href = dataUrl;
                  link.click();
              })
              .catch((error) => {
                  console.error('Error exporting to image:', error);
              })
              .finally(() => {
                  editButtons.forEach((button) => (button.style.display = ''));
              });
      }
  };

    return (
        <>
          <SideBar/>
          <div className="grocery-list-container">
            <div className="list-container">
              <h3>Grocery List</h3>
              <ul className="grocery-list">
                {items.map((item) => (
                  <GroceryListItem
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
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
              <div className="input-row">
                <input
                  type="text"
                  placeholder="Quantity"
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(e.target.value)}
                  className="input-field"
                />
                <Select
                  value={measurementOptions.find(o => o.value === newItemMeasurement) || null}
                  onChange={(selectedOption) =>
                    setNewItemMeasurement(selectedOption ? selectedOption.value : '')
                  }
                  options={measurementOptions}
                  className="input-field-select"
                  placeholder="Select unit"
                />
              </div>
              <button onClick={handleAddItem} className="add-item-btn">
                Add Item
              </button>
              <button onClick={handleClear} className="clear-list-btn">
                Clear List
              </button>
              <button onClick={handleExportToImage} className="export-list-btn">
                Export to Image
              </button>
            </div>
          </div>
        </>
    );
};

interface GroceryListItemProps {
    item: GroceryItem;
    onEdit: (id: number, name: string, quantity: number, measurement: string) => void;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const GroceryListItem: React.FC<GroceryListItemProps> = ({ item, onEdit, onToggle, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(item.name);
    const [newQuantity, setNewQuantity] = useState(item.quantity.toString());
    const [newMeasurement, setNewMeasurement] = useState(item.measurement);
  
    const handleEditToggle = () => {
      if (isEditing) {
        onEdit(item.id, newName, parseFloat(newQuantity), newMeasurement);
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
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              className="edit-input"
              placeholder="Quantity"
            />
            <input
              type="text"
              value={newMeasurement}
              onChange={(e) => setNewMeasurement(e.target.value)}
              className="edit-input"
              placeholder="Measurement"
            />
          </div>
        ) : (
          <div className="display-mode">
            <span className="item-name">{item.name}</span>
            <span className="item-info">{item.quantity} {item.measurement}</span>
          </div>
        )}
        {isEditing && (
           <button onClick={() => onDelete(item.id)} className="delete-btn">
             Delete
           </button>
         )}
        <button onClick={handleEditToggle} className="edit-btn">
                {isEditing ? 'Save' : 'Edit'}
        </button>
      </li>
    );
  };
  
  export default GroceryList;