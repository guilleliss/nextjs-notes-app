"use client";

import PocketBase from "pocketbase";
import { useRouter } from "next/navigation";
import styles from "../Notes.module.css";

async function getNote(noteId: string) {
  const db = new PocketBase("http://127.0.0.1:8090");
  const data = await db.collection("notes").getOne(noteId);
  return data;
}

export default async function NotePage({ params }: any) {
  const router = useRouter();
  const { id, title, content, created } = await getNote(params.id);

  async function deleteNote(id: string) {
    const db = new PocketBase("http://127.0.0.1:8090");
    try {
      await db.collection("notes").delete(id);
      router.push("/notes");
    } catch (error) {
      console.log("Error:", error);
    }
  }

  return (
    <div className="space-y-10">
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>

      <button className="bg-red-500" onClick={() => deleteNote(id)}>
        Delete note
      </button>
    </div>
  );
}
