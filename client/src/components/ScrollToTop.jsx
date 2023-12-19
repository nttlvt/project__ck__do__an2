import { useEffect, useState } from "react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 900) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
      <div className="fixed z-[5] bottom-12 right-8 flex justify-center items-center cursor-pointer text-sm">
        {isVisible && (
          <div
            className="w-8 h-8 border-2 border-solid border-stone-400 rounded-full hover:bg-red-100"
            onClick={() => scrollToTop()}
          >
            <svg
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fill="#000000"
                  fillRule="nonzero"
                  d="M20 12l6 5.656-1.5 1.414-3.44-3.242V28h-2.12V15.828L15.5 19.07 14 17.656z"
                ></path>
              </g>
            </svg>
          </div>
        )}
      </div>
  );
};
