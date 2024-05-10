import { BarLoader } from "react-spinners";

interface UploadFormProps {
  itemData: {
    item_name: string;
    category: string;
    colour: string;
    brand: string;
  };
  processedImage: string | null;
  uploadedImage: string | null;
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
  uploadedImage,
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
        className="input-shadow font-normal rounded-md py-1 px-2"
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
      <label htmlFor="item_name">
        Name <span className="text-red-400">*</span>
      </label>
      <input
        className="input-shadow font-normal rounded-md py-1 px-4"
        type="text"
        id="item_name"
        value={itemData.item_name}
        onChange={handleInputChange}
      />
      <label htmlFor="colour">Colour</label>
      <input
        className="input-shadow font-normal rounded-md py-1 px-4"
        type="text"
        id="colour"
        value={itemData.colour}
        onChange={handleInputChange}
      />
      <label htmlFor="brand">Brand</label>
      <input
        className="input-shadow font-normal rounded-md py-1 px-4"
        type="text"
        id="brand"
        value={itemData.brand}
        onChange={handleInputChange}
      />
      {uploadedImage && !processedImage && (
        <div className="flex flex-col gap-2 justify-center items-center mt-auto">
          <p className="text-dark-grey">Removing background image...</p>
          <BarLoader color={"#A093AB"} />
        </div>
      )}
      {uploadedImage && processedImage && (
        <div className="flex flex-col gap-2 justify-center items-center mt-auto">
          {itemData.category.length === 0 ? (
            <p className="text-dark-grey">
              Please select a category for your item
            </p>
          ) : itemData.item_name.length === 0 ? (
            <p className="text-dark-grey">Please enter a name for your item</p>
          ) : (
            <p className="text-dark-grey">Ready to be added to your closet!</p>
          )}
        </div>
      )}
      <div className="flex gap-2 mt-auto pt-2">
        <button
          className={`button-shadow ${processedImage && itemData.category && itemData.item_name ? "bg-green-grey hover:brightness-95 cursor-pointer" : "bg-light-grey cursor-not-allowed"} text-bv-white px-4 py-2 rounded-md w-1/2  transition`}
          onClick={handleConfirmUpload}
          disabled={
            !processedImage || !itemData.category || !itemData.item_name
          }
        >
          Confirm
        </button>
        <button
          className="button-shadow bg-red-400 text-bv-white px-4 py-2 rounded-md w-1/2 hover:brightness-95 transition"
          onClick={() => setShowUploadModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default UploadForm;
