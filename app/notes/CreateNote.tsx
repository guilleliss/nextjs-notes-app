"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import Spinner from "@/components/Spinner";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const create = async () => {
    setIsLoading(true);
    if (title && content) {
      try {
        const db = new PocketBase("http://127.0.0.1:8090");
        const data = await db.collection("notes").create(
          JSON.stringify({
            title,
            content,
          })
        );
        router.refresh();
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <form onSubmit={create}>
      <div className="grid space-y-5 bg-slate-200 rounded-md p-5">
        <h3 className="font-bold text-md">Create a new note</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="bg-red-400 flex justify-center">
          {isLoading ? <Spinner /> : "Create note"}
        </button>
      </div>
    </form>
  );
}
