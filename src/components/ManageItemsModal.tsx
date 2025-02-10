"use client";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";

type ManageItemsModalProps = {
  title: string;
  pendingItems: number[];
  allItems: { id: number; name: string }[];
  onClose: () => void;
  onUpdate: () => Promise<void>;
  onAddItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
  selectPlaceholder: string;
  getItemName: (item: any) => string;
};

export function ManageItemsModal({
  title,
  pendingItems,
  allItems,
  onClose,
  onUpdate,
  onAddItem,
  onDeleteItem,
  selectPlaceholder,
  getItemName,
}: ManageItemsModalProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <ul className="mb-4">
          {pendingItems.map((itemId) => {
            const item = allItems.find((i) => i.id === itemId);
            return (
              <li key={itemId} className="flex justify-between items-center">
                {item && getItemName(item)}
                <button
                  className="text-red-500"
                  onClick={() => onDeleteItem(itemId)}
                >
                  <Trash className="w-5 h-5" />
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex space-x-2 mb-4">
          <select
            className="border p-2 rounded flex-grow"
            onChange={(e) => setSelectedId(Number(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>
              {selectPlaceholder}
            </option>
            {allItems.map((item) => (
              <option key={item.id} value={item.id}>
                {getItemName(item)}
              </option>
            ))}
          </select>
          <button
            onClick={() => selectedId && onAddItem(selectedId)}
            className="bg-green-500 text-white p-2 rounded"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={onUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
