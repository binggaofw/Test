import { useState } from 'react';

import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useAsync } from 'react-async-hook';

import { Tweet } from '../../components/TweetItem/TweetItem';
import { Service } from '../../types/service';
import useConstant from '../useconstant';

const useTweetSearch = (searchString: string) => {
  const [result, setResult] = useState<Service<Tweet[]>>({
    status: "init",
  });
  const amountToFetch = 10;

  const fetchData = async (searchTerm: string) => {
    setResult({ status: "loading" });
    try {
      const response = await fetch(
        // for aws lightsail use
         `https://container-service-3.f4peb530dmhr8.us-west-2.cs.amazonlightsail.com/twitter-search?q=${searchTerm}&count=${amountToFetch}`,
        //  `http://localhost:8080/twitter-search?q=${searchTerm}&count=${amountToFetch}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseJson = await response.json();

      if (responseJson.errors)
        throw new Error(responseJson.errors[0] || "The api request failed");
      if (responseJson) setResult({ status: "loaded", payload: responseJson });
      else setResult({ status: "loaded", payload: responseJson });
    } catch (e: any) {
      setResult({
        status: "error",
        error: { name: e.name, message: e.message },
      });
    }
  };

  const debouncedSearchFunction = useConstant(() =>
    AwesomeDebouncePromise(fetchData, 300)
  );

  useAsync(async () => {
    if (searchString.length === 0) {
    } else {
      debouncedSearchFunction(searchString);
    }
  }, [debouncedSearchFunction, searchString]);
  return result;
};

export default useTweetSearch;
