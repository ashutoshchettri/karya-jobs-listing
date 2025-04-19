"use client";

import Link from "next/link";
import { jobType } from "@/types/jobTypes";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favoritesStore";

interface JobsCardProps {
  job: jobType;
}

const JobCard = ({ job }: JobsCardProps) => {
  const { data: session } = useSession();
  const isUser = session?.user?.role === "USER";

  const isFavorited = useFavoritesStore((state) => state.isFavorited(job.id.toString()));
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    isFavorited ? removeFavorite(job.id.toString()) : addFavorite(job);
  };

  return (
    <div className="relative">
      <Link href={`/job/${job.id}`}>
        <div className="group relative cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between">
            {/* Logo + Author */}
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={job.img ? job.img.toString() : "/fallbackimage.png"}
                  alt={`${job.author} logo`}
                  height={40}
                  width={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm text-gray-700 font-semibold">{job.author}</h3>
                <p className="text-xs text-gray-500">{job.location}</p>
              </div>
            </div>

            {/* Salary */}
            <p className="text-sm font-medium text-green-600">{job.salary}</p>
          </div>

          {/* Job Info */}
          <div className="mt-5">
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
              {job.name}
            </h2>
            <div className="mt-2 inline-block rounded-full bg-blue-100 text-blue-700 text-xs px-3 py-1 font-medium">
              {job.employmentType}
            </div>
          </div>

          {isUser && (
            <button
              onClick={toggleFavorite}
              className="absolute bottom-4 right-4 z-10"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorited ? "text-red-500 fill-red-500" : "text-gray-400"
                }`}
              />
            </button>
          )}
        </div>
      </Link>
    </div>
  );
};

export default JobCard;
