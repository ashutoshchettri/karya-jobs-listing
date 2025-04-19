"use client";

import Button from "../ui/Button";
import Input from "../ui/Input";
import { ChangeEvent, useState, useEffect } from "react";
import useJobStore from "@/store/useJobStore";
import { jobType } from "@/types/jobTypes";

interface SearchFormProps {
  jobs: jobType[];
}

const initialState = {
  title: "",
  location: "",
  author: "",
};

const SearchForm = ({ jobs }: SearchFormProps) => {
  const [state, setState] = useState(initialState);
  const { setFilteredJobs } = useJobStore();

  useEffect(() => {
    const filteredJobs = jobs.filter((item) => {
      const titleCondition =
        state.title === "" ||
        item.name.toLowerCase().includes(state.title.toLowerCase());
      const locationCondition =
        state.location === "" ||
        item.location.toLowerCase().includes(state.location.toLowerCase());
      const companyCondition =
        state.author === "" ||
        item.author.toLowerCase().includes(state.author.toLowerCase());

      return titleCondition && locationCondition && companyCondition;
    });

    setFilteredJobs(filteredJobs);
  }, [jobs, state, setFilteredJobs]);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            id="title"
            type="text"
            noLabel
            placeHolder="Job title"
            onChange={onChange}
          />
          <Input
            id="location"
            type="text"
            noLabel
            placeHolder="Location"
            onChange={onChange}
          />
          <Input
            id="author"
            type="text"
            noLabel
            placeHolder="Company"
            onChange={onChange}
          />
          <Button type="submit" fullWidth>
            Search Jobs
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
