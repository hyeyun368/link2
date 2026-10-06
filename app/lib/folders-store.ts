import "server-only";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Folder } from "@/app/lib/data";

type FolderRow = { id: number; name: string };

const toFolder = (row: FolderRow): Folder => ({
  id: String(row.id),
  name: row.name,
});

async function supabase() {
  return createClient(await cookies());
}

export async function getFolders(): Promise<Folder[]> {
  const { data, error } = await (await supabase())
    .from("folders")
    .select("id, name")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data.map(toFolder);
}

export async function addFolder(name: string): Promise<Folder> {
  const { data, error } = await (await supabase())
    .from("folders")
    .insert({ name })
    .select("id, name")
    .single();

  if (error) throw error;
  return toFolder(data);
}

export async function renameFolder(id: string, name: string): Promise<boolean> {
  const { data, error } = await (await supabase())
    .from("folders")
    .update({ name })
    .eq("id", Number(id))
    .select("id");

  if (error) throw error;
  return data.length > 0;
}

// 폴더 안의 링크는 DB의 on delete set null로 폴더 없음 상태가 된다.
export async function removeFolder(id: string): Promise<boolean> {
  const { data, error } = await (await supabase())
    .from("folders")
    .delete()
    .eq("id", Number(id))
    .select("id");

  if (error) throw error;
  return data.length > 0;
}
