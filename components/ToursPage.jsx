'use client';
import { useState } from 'react';
import { getAllTours } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";

const ToursPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const { data, isPending } = useQuery({
    queryKey: ['tours', searchValue],
    queryFn: () => getAllTours(searchValue),
  });
  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input className="input input-bordered join-item w-full"
          type="text" placeholder="enter city or country here..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)} />
          <button disabled={isPending} onClick={() => setSearchValue('')} type="button" className="btn btn-primary join-item">
            {isPending ? 'please wait...' : 'reset'}
          </button>
        </div>
      </form>
      { isPending ? <span className="loading"></span> : <ToursList data={data} />}
    </>
  );
}

export default ToursPage;