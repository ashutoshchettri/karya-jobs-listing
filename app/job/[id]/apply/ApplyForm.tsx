// app/job/[id]/apply/ApplyForm.tsx
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ApplyForm = ({ jobId }: { jobId: string }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Application submitted successfully!");
    router.push("/");
  };

  return (
    <div className="pt-28 pb-16 px-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Apply for Job</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-xl shadow-md border border-gray-200"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-4 py-2 text-gray-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-4 py-2 text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Resume (Link)</label>
          <input
            type="url"
            className="w-full border rounded-lg px-4 py-2 text-gray-900"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
          <textarea
            rows={5}
            className="w-full border rounded-lg px-4 py-2 text-gray-900"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
