const Pagination = () => {
  return (
    <div className="flex justify-between items-center gap-4 p-2">
      <button
        className="p-1 rounded-lg bg-[#f3f3f375] w-[50px] disabled:bg-[#a7a7a775] disabled:cursor-not-allowed"
        disabled
      >
        Prev
      </button>
      <button className="p-1 rounded-lg bg-[#f3f3f375] w-[50px] disabled:bg-[#a7a7a775] disabled:cursor-not-allowed">
        Next
      </button>
    </div>
  );
};

export default Pagination;
