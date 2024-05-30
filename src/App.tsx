import { Fragment, useEffect } from "react";
import "./App.css";
import useImages from "./hooks/useImages";
import { useInView } from "react-intersection-observer";
import { IImage } from "./types/interface";

function App() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useImages(30);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <div className="gallery">
      {data?.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>
          {page.map((image: IImage) => (
            <div key={image.id} className="image-item">
              <img src={image.download_url} alt={image.author} />
              <p>{image.author}</p>
            </div>
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: "20px" }} />
      {isFetchingNextPage && <p>Loading more images...</p>}
    </div>
  );
}

export default App;
