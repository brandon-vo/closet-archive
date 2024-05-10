"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import ItemModal from "./ItemModal";
import { refreshItemsState } from "./UploadModal/UploadModal";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ItemsProps {
  userID: string;
}

const Items: React.FC<ItemsProps> = ({ userID }) => {
  const [items, setItems] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const refreshItems = useRecoilValue(refreshItemsState);
  const setRefreshItems = useSetRecoilState(refreshItemsState);

  const fetchItems = async () => {
    const supabase = await createClient();

    const { data: closetData, error: closetError } = await supabase.storage
      .from("closet")
      .list(userID + "/");
    if (closetData) {
      const { data: itemData, error: itemError } = await supabase
        .from("item_data")
        .select("*");

      if (itemData) {
        const updatedItems = closetData.map((item: any) => {
          const associatedItem = itemData.find(
            (dataItem: any) => dataItem.id === item.id,
          );
          if (associatedItem) {
            return {
              ...item,
              category: associatedItem.category,
              item_name: associatedItem.item_name,
              colour: associatedItem.colour,
              brand: associatedItem.brand,
            };
          }
          return item;
        });
        setItems(updatedItems);
      } else {
        console.error(itemError);
      }
    } else {
      console.error(closetError);
    }
  };

  const onDelete = async () => {
    const supabase = await createClient();

    const { error: closetError } = await supabase.storage
      .from("closet")
      .remove([`${userID}/${selectedItem.name}`]);

    if (closetError) {
      console.error("Error deleting item from closet:", closetError);
      return;
    }

    const { error: itemError } = await supabase
      .from("item_data")
      .delete()
      .eq("id", selectedItem.id);

    if (itemError) {
      console.error("Error deleting item from item_data:", itemError);
      return;
    }

    setModalOpen(false);
    setItems(items.filter((item: any) => item.id !== selectedItem.id));
  };

  const filterItemsByCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchItems();
    setRefreshItems(false);
  }, [refreshItems]);

  return (
    <div className="flex flex-col my-2 h-screen pb-44">
      <div className="flex gap-4 md:gap-10">
        <h1
          className={`${
            selectedCategory === "All"
              ? "text-dark-violet font-bold"
              : "text-light-grey cursor-pointer"
          } text-xl`}
          onClick={() => filterItemsByCategory("All")}
        >
          All
        </h1>
        <h1
          className={`${
            selectedCategory === "Outer"
              ? "text-dark-violet font-bold"
              : "text-light-grey cursor-pointer"
          } text-xl`}
          onClick={() => filterItemsByCategory("Outer")}
        >
          Outer
        </h1>
        <h1
          className={`${
            selectedCategory === "Top"
              ? "text-dark-violet font-bold"
              : "text-light-grey cursor-pointer"
          } text-xl`}
          onClick={() => filterItemsByCategory("Top")}
        >
          Tops
        </h1>
        <h1
          className={`${
            selectedCategory === "Bottom"
              ? "text-dark-violet font-bold"
              : "text-light-grey cursor-pointer"
          } text-xl`}
          onClick={() => filterItemsByCategory("Bottom")}
        >
          Bottoms
        </h1>
        <h1
          className={`${
            selectedCategory === "Shoes"
              ? "text-dark-violet font-bold"
              : "text-light-grey cursor-pointer"
          } text-xl`}
          onClick={() => filterItemsByCategory("Shoes")}
        >
          Shoes
        </h1>
        <h1
          className={`${
            selectedCategory === "Accessory"
              ? "text-dark-violet font-bold"
              : "text-light-grey cursor-pointer"
          } text-xl`}
          onClick={() => filterItemsByCategory("Accessory")}
        >
          Accessories
        </h1>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-3
      lg:grid-cols-4 w-full scrollbar overflow-y-scroll mt-4"
      >
        {items
          .filter(
            (item: any) =>
              selectedCategory === "All" || item.category === selectedCategory,
          )
          .map((item: any) => (
            <React.Fragment key={item.id}>
              <img
                key={item.id}
                src={`https://vapmcwowofufqkupwqeo.supabase.co/storage/v1/object/public/closet/${userID}/${item.name}`}
                alt={`${item.name}`}
                className="aspect-square object-contain cursor-pointer"
                onClick={() => handleItemClick(item)}
              />
            </React.Fragment>
          ))}
      </div>

      {modalOpen && (
        <ItemModal
          item={selectedItem}
          userID={userID}
          onClose={() => setModalOpen(false)}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default Items;
