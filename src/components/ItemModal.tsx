import React, { useState } from "react";

interface ItemModalProps {
  item: any;
  userID: string;
  onClose: () => void;
  onDelete: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({
  item,
  userID,
  onClose,
  onDelete,
}) => {
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {confirmDelete ? (
        <div
          className="flex flex-col items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[100] p-4 bg-bv-white rounded-md shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="text-xl font-bold">
            Are you sure you want to delete this item?
          </h1>
          <p className="text-slate-grey mb-2">This action cannot be undone</p>
          <div className="flex gap-2">
            <button
              className="bg-red-400 p-2 rounded-md button-shadow text-bv-white"
              onClick={onDelete}
            >
              Delete
            </button>
            <button
              className="bg-slate-grey p-2 rounded-md button-shadow text-bv-white"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div
          className="bg-bv-white w-[80vw] md:w-[700px] p-4 rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold">{item.item_name}</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center md:items-start md:flex-row gap-4 mt-4">
              <img
                src={`https://vapmcwowofufqkupwqeo.supabase.co/storage/v1/object/public/closet/${userID}/${item.name}`}
                alt={item.name}
                className="h-[50vw] w-[50vw] lg:h-[400px] md:min-h-[360px] aspect-square bg-calm-grey"
              />
              <div className="flex flex-col gap-2 w-full">
                <p>
                  <span className="font-bold">Category:</span> {item.category}
                </p>
                {item.colour && (
                  <p>
                    <span className="font-bold">Colour:</span> {item.colour}
                  </p>
                )}
                {item.brand && (
                  <p>
                    <span className="font-bold">Brand:</span> {item.brand}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-auto w-full">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-lake-blue text-white rounded-md w-3/4"
              >
                Done
              </button>
              <button
                onClick={() => setConfirmDelete(true)}
                className="px-4 py-2 bg-red-400 text-white rounded-md w-1/4"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemModal;
