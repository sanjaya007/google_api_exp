import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { useResultContext } from "../contexts/ResultContext";
import Loading from "./Loading";

const Results = () => {
  const { getResults, results, searchTerm, isLoading } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      {
        console.log(results);
      }
      return (
        <div className="flex flex-wrap justify-between space-y-6 xl:px-60 lg:px-40 md:px-20">
          {results?.map((value, index) => (
            <div className="md:w-2/5 w-full" key={index}>
              <a href={value?.link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {value?.link?.length > 30
                    ? value?.link.substring(0, 30) + "..."
                    : value?.link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {value?.title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );

    case "/image":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map((value, index) => (
            <a
              className="sm:p-3 p-5"
              href={value?.link?.href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={value?.image?.src}
                alt={value?.link?.title}
                loading="lazy"
              />
              <p className="w-36 break-words text-sm mt-2">
                {value?.link?.title}
              </p>
            </a>
          ))}
        </div>
      );

    case "/news":
      return (
        <div className="flex flex-wrap justify-between space-y-6 xl:px-60 lg:px-40 md:px-20 items-center">
          {results?.map((value, index) => (
            <div className="md:w-2/5 w-full" key={value?.id}>
              <a href={value?.link} target="_blank" rel="noreferrer">
                <p className="text-lg dark:text-blue-300 text-blue-700 hover:underline">
                  {value?.title}
                </p>
              </a>
              <div className="flex gap-4">
                <a
                  href={value?.source?.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline hover:text-blue-500"
                >
                  {value?.source?.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );

    case "/videos":
      return (
        <div className="flex flex-wrap">
          {results.map((video, index) => (
            <div key={index} className="p-2">
              {video?.additional_links?.[0]?.href && (
                <ReactPlayer
                  url={video?.additional_links?.[0]?.href}
                  controls
                  width="355px"
                  height="200px"
                />
              )}
            </div>
          ))}
        </div>
      );

    default:
      return "ERROR!";
  }
};

export default Results;
