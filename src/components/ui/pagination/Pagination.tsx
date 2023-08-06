import React, { useEffect, useState } from "react";

interface PaginationProps {
  page: number;
  limit: number;
  initialVisiblePages?: number;
  change: (newPage: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  change,
  initialVisiblePages = 3,
  className = "",
}) => {
  const symbol = "...";
  const [pages, setPages] = useState<(number | string)[]>([]);

  const createNumbersArray: (min: number, max: number) => number[] = (
    min,
    max
  ) => {
    const numbers = [];

    for (let i = min; i <= max; i++) {
      numbers.push(i);
    }

    return numbers;
  };

  useEffect(() => {
    let currPages: (string | number)[] = [];

    if (limit < 4) {
      for (let i = 1; i <= limit; i++) {
        currPages.push(i);
      }
    } else {
      currPages = [
        ...createNumbersArray(1, initialVisiblePages),
        symbol,
        limit,
      ];
    }

    setPages(currPages);
  }, [limit]);

  const handlePage = (newPage: number | string) => {
    newPage = +newPage || newPage;

    if (newPage === symbol) return;

    setPages((pages) => {
      let currPages = [];

      if (limit < 4) {
        for (let i = 1; i <= limit; i++) {
          currPages.push(i);
        }
        return currPages;
      }

      if (typeof newPage === "number") {
        console.log(limit - initialVisiblePages);

        if (
          newPage >= initialVisiblePages &&
          newPage <= limit - initialVisiblePages + 1
        ) {
          return [1, symbol, newPage - 1, newPage, newPage + 1, symbol, limit];
        }

        if (newPage < initialVisiblePages) {
          return [...createNumbersArray(1, initialVisiblePages), symbol, limit];
        }

        if (newPage > limit - initialVisiblePages) {
          return [
            1,
            symbol,
            ...createNumbersArray(limit - initialVisiblePages + 1, limit),
          ];
        }
      }

      return pages;
    });

    if (typeof newPage === "number") change?.(newPage);
  };

  useEffect(() => {
    if (limit && page > limit) handlePage(limit);
  }, [page, limit]);

  if (limit <= 1) return <></>;

  return (
    <ul className={`flex justify-center items-center gap-[4px] outline-none ${className}`}>
      {pages.map((item, key) => (
        <li key={key}>
          <button
            name={item + ""}
            onClick={(e: any) => handlePage(e.target.name)}
            style={{
              backgroundColor:
                item === symbol
                  ? "inherit"
                  : item === page
                  ? "#089449"
                  : "#F3F3F3",
              color: item === page ? "white" : "black",
            }}
            className="rounded-[4px] w-[50px] h-[50px] flex justify-center items-center text-[20px] leading-[23px] nmbl:w-[40px] nmbl:h-[40px] nmbl:text-[18px]"
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(Pagination);
