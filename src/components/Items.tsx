"use client";

import React from "react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

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
    <div className="my-2">
      {/* TODO make clickable categories */}
      <div className="flex gap-4 md:gap-10">
        <h1 className="text-medium-grey text-xl font-bold">All</h1>
        <h1 className="text-medium-grey text-xl font-bold">Tops</h1>
        <h1 className="text-medium-grey text-xl font-bold">Bottoms</h1>
        <h1 className="text-medium-grey text-xl font-bold">Shoes</h1>
        <h1 className="text-medium-grey text-xl font-bold">Accessories</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
        {items.map((item: any) => (
          <React.Fragment key={item.id}>
            <img
              key={item.id}
              src={`https://vapmcwowofufqkupwqeo.supabase.co/storage/v1/object/public/closet/${userID}/${item.name}`}
              alt={"Image"}
              className="aspect-square object-contain"
            />
            <div>Type: {item.category}</div>
            <div>Name: {item.item_name}</div>
            <div>Colour: {item.colour}</div>
            <div>Brand: {item.brand}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Items;
