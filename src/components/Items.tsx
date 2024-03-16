"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface ItemsProps {
  userID: string;
}

const Items: React.FC<ItemsProps> = ({ userID }) => {
  const [items, setItems] = useState<any>([]);

  const fetchItems = async () => {
    const supabase = await createClient();

    const { data, error } = await supabase.storage
      .from("closet")
      .list(userID + "/");
    if (data) {
      setItems(data);
    } else {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <h1>My Closet</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
        {items.map((item: any) => (
          <img
            key={item.id}
            src={`https://vapmcwowofufqkupwqeo.supabase.co/storage/v1/object/public/closet/${userID}/${item.name}`}
            alt={item.name}
            className="aspect-square object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default Items;
