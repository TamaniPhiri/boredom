import axios from "axios";

export const fetchImages = async (page: number, limit: number) => {
  const res = await axios.get(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
  );
  console.log(res.data);

  return res.data;
};
