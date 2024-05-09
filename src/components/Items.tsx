"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface ItemsProps {
  userID: string;
}

const Items: React.FC<ItemsProps> = ({ userID }) => {
  const [items, setItems] = useState<any>([]);

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

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="flex flex-col my-2 h-screen pb-44">
      {/* TODO make clickable categories */}
      <div className="flex gap-4 md:gap-10">
        <h1 className="text-dark-violet text-xl font-bold">All</h1>
        <h1 className="text-medium-grey text-xl font-regular">Outer</h1>
        <h1 className="text-medium-grey text-xl font-regular">Tops</h1>
        <h1 className="text-medium-grey text-xl font-regular">Bottoms</h1>
        <h1 className="text-medium-grey text-xl font-regular">Shoes</h1>
        <h1 className="text-medium-grey text-xl font-regular">Accessories</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full scrollbar overflow-y-scroll mt-4">
        {items.map((item: any) => (
          <React.Fragment key={item.id}>
            <img
              key={item.id}
              src={`https://vapmcwowofufqkupwqeo.supabase.co/storage/v1/object/public/closet/${userID}/${item.name}`}
              alt={"Image"}
              className="aspect-square object-contain"
            />
            {/* <div>Type: {item.category}</div>
            <div>Name: {item.item_name}</div>
            <div>Colour: {item.colour}</div>
            <div>Brand: {item.brand}</div> */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Items;
