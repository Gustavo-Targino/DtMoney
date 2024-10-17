import { useEffect, useState } from "react";
import { ApiService } from "../services/Api/ApiService";

type Categories = {
  id: number;
  name: string;
};
export function useCategories() {
  const [categories, setCategories] = useState<Categories[]>([]);

  const fetchCategories = async () => {
    const response = await ApiService.get("/category/list");

    setCategories(response.data);
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  return { categories, fetchCategories }; 
}
