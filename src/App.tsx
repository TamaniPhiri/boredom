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

  const handleCopy = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch(() => {
        alert("Failed to copy URL");
      });
  };

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "image";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className=" bg-slate-500">
      {data?.pages.map((page, pageIndex) => (
        <Fragment key={pageIndex}>
          {page.map((image: IImage) => (
            <div key={image.id}>
              <img
                src={image.download_url}
                alt={image.author}
                className=" w-5 h-7"
              />
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
