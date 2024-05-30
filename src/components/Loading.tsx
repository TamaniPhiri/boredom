const Items = Array.from({ length: 30 }, (_, i) => (
  <div
    key={i}
    className="animate-pulse group h-56 md:h-full relative w-full overflow-hidden"
  >
    <div className="bg-gray-300 w-full h-full rounded-2xl"></div>
    <div className="flex gap-6 items-center absolute rounded-full p-4 bg-white -right-full -bottom-full">
      <div className="h-6 w-6 rounded bg-gray-200"></div>
      <div className="h-6 w-6 rounded bg-gray-200"></div>
    </div>
  </div>
));

const Loading = () => {
  return <div className="grid md:grid-cols-3 grid-cols-2 gap-4">{Items}</div>;
};

export default Loading;
