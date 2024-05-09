interface UploadFormProps {
  itemData: {
    item_name: string;
    category: string;
    colour: string;
    brand: string;
  };
  processedImage: string | undefined;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleConfirmUpload: () => void;
  setShowUploadModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const categories = ["Top", "Outer", "Bottom", "Shoes", "Accessory", "Other"];

const UploadForm: React.FC<UploadFormProps> = ({
  itemData,
  processedImage,
  handleInputChange,
  handleConfirmUpload,
  setShowUploadModal,
}) => {
  return (
    <div className="flex flex-col gap-1 md:gap-4 w-full md:w-[50%]">
      <label htmlFor="category">
        Category <span className="text-red-400">*</span>
      </label>
      <select
        className="bg-gray-100"
        id="category"
        value={itemData.category}
        onChange={handleInputChange}
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <label htmlFor="item_name">Name</label>
      <input
        className="bg-gray-100"
        type="text"
        id="item_name"
        value={itemData.item_name}
        onChange={handleInputChange}
      />
      <label htmlFor="colour">Colour</label>
      <input
        className="bg-gray-100"
        type="text"
        id="colour"
        value={itemData.colour}
        onChange={handleInputChange}
      />
      <label htmlFor="brand">Brand</label>
      <input
        className="bg-gray-100"
        type="text"
        id="brand"
        value={itemData.brand}
        onChange={handleInputChange}
      />
      <div className="flex gap-2 mt-auto pt-2">
        <button
          className={`${processedImage ? "bg-green-grey hover:brightness-95" : "bg-slate-grey"} text-bv-white px-4 py-2 rounded-md w-1/2  transition`}
          onClick={handleConfirmUpload}
          disabled={!processedImage || !itemData.category}
        >
          Confirm
        </button>
        <button
          className="bg-red-400 text-bv-white px-4 py-2 rounded-md w-1/2 hover:brightness-95 transition"
          onClick={() => setShowUploadModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default UploadForm;
