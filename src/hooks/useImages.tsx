import { useInfiniteQuery } from "react-query";
import { fetchImages } from "../api/helpers/helpers";

const useImages = (limit: number) => {
  return useInfiniteQuery(
    "images",
    ({ pageParam = 1 }) => fetchImages(pageParam, limit),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < limit) {
          return undefined;
        }
        return pages.length + 1;
      },
    }
  );
};

export default useImages;
