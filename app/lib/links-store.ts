import "server-only";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Link } from "@/app/lib/data";

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
  created_at: string;
};

function toLink(row: LinkRow): Link {
  return {
    id: String(row.id),
    url: row.url,
    title: row.title ?? row.url,
    description: row.description ?? "",
    thumbnailUrl: row.thumbnail_url ?? undefined,
    createdAt: row.created_at,
    folderId: row.folder_id === null ? undefined : String(row.folder_id),
  };
}

async function supabase() {
  return createClient(await cookies());
}

export async function getLinks(): Promise<Link[]> {
  const { data, error } = await (await supabase())
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data as LinkRow[]).map(toLink);
}

// id와 created_at은 DB가 채운다.
export async function addLink(
  link: Omit<Link, "id" | "createdAt">,
): Promise<Link> {
  const { data, error } = await (await supabase())
    .from("bookmarks")
    .insert({
      url: link.url,
      title: link.title,
      description: link.description,
      thumbnail_url: link.thumbnailUrl ?? null,
      folder_id: link.folderId ? Number(link.folderId) : null,
    })
    .select()
    .single();

  if (error) throw error;
  return toLink(data as LinkRow);
}
