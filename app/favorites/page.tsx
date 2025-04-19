"use client";

import { useFavoritesStore } from "@/store/favoritesStore";
import JobCard from "@/components/shared/JobCard";

const FavoritesPage = () => {
const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div className="w-[90%] mx-auto max-w-[1450px] pt-28 pb-10">
    <h1 className="text-2xl font-bold mb-6">Your Favorite Jobs</h1>
        {favorites.length === 0 ? (
            <p className="text-gray-500">You haven't favorited any jobs yet.</p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((job) => (
                <JobCard key={String(job.id)} job={job} />
            ))}
            </div>
        )}
    </div>
  );
};

export default FavoritesPage;
