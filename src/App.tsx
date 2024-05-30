import { useEffect } from "react";
import "./App.css";
import useImages from "./hooks/useImages";
import { useInView } from "react-intersection-observer";
import { IImage } from "./types/interface";
import toast from "react-hot-toast";

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
        toast.success("Copied Url to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy URL");
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
    <section className=" min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-12">
      {data?.pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="grid md:grid-cols-3 grid-cols-2 gap-4 py-12"
        >
          {page.map((item: IImage) => (
            <div key={item.id} className="relative">
              <img
                src={item.download_url}
                alt={item.author}
                className="w-full h-full rounded-2xl object-center object-cover"
                loading="lazy"
              />
              <div className="flex gap-4 items-center absolute bottom-4 right-4">
                <button onClick={() => handleCopy(item.url)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </button>
                <button onClick={() => handleDownload(item.download_url)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div ref={ref} style={{ height: "20px" }} />
      {isFetchingNextPage && <p>Loading more images...</p>}
    </section>
  );
}

export default App;
