"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addFolder,
  getFolders,
  removeFolder,
  renameFolder,
} from "@/app/lib/folders-store";
import { addLink, getLinks } from "@/app/lib/links-store";

export type CreateLinkState = { error?: string };
export type CreateFolderState = { error?: string; ok?: boolean };

const MAX_FOLDER_NAME = 20;

export async function createFolder(
  _prevState: CreateFolderState,
  formData: FormData,
): Promise<CreateFolderState> {
  const name = String(formData.get("name") ?? "").trim();
  const error = await validateFolderName(name);
  if (error) return { error };

  await addFolder(name);
  revalidatePath("/", "layout");
  return { ok: true };
}

export async function updateFolder(
  id: string,
  rawName: string,
): Promise<{ error?: string }> {
  const name = rawName.trim();
  const error = await validateFolderName(name, id);
  if (error) return { error };

  const renamed = await renameFolder(id, name);
  if (!renamed) return { error: "이미 삭제된 폴더입니다." };

  revalidatePath("/", "layout");
  return {};
}

// 이름 검사. 수정할 때는 자기 자신(excludeId)과의 중복은 허용한다.
async function validateFolderName(name: string, excludeId?: string) {
  if (!name) return "폴더 이름을 입력해 주세요.";
  if (name.length > MAX_FOLDER_NAME) {
    return `폴더 이름은 ${MAX_FOLDER_NAME}자 이하로 입력해 주세요.`;
  }

  const folders = await getFolders();
  if (folders.some((f) => f.name === name && f.id !== excludeId)) {
    return "이미 있는 폴더 이름입니다.";
  }
}

// 폴더만 삭제하고, 폴더 안의 링크는 그대로 둔다.
export async function deleteFolder(id: string): Promise<{ error?: string }> {
  const removed = await removeFolder(id);
  if (!removed) return { error: "이미 삭제된 폴더입니다." };

  revalidatePath("/", "layout");
  return {};
}

export async function createLink(
  _prevState: CreateLinkState,
  formData: FormData,
): Promise<CreateLinkState> {
  const rawUrl = String(formData.get("url") ?? "").trim();

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return { error: "올바른 URL을 입력해 주세요." };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { error: "http 또는 https 주소만 저장할 수 있습니다." };
  }

  const links = await getLinks();
  if (links.some((link) => link.url === url.href)) {
    return { error: "이미 저장된 링크입니다." };
  }

  const { title, description, thumbnailUrl } = await fetchPageMeta(url);
  await addLink({ url: url.href, title, description, thumbnailUrl });

  revalidatePath("/");
  redirect("/");
}

// 페이지의 <title>, description, og:image를 가져오고, 실패하면 도메인 이름을 제목으로 쓴다.
async function fetchPageMeta(url: URL) {
  const fallback: { title: string; description: string; thumbnailUrl?: string } =
    { title: url.hostname, description: "" };

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!response.ok) return fallback;
    const html = await response.text();

    const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1];
    const description =
      html.match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i,
      )?.[1] ??
      html.match(
        /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i,
      )?.[1];

    const image =
      html.match(
        /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i,
      )?.[1] ??
      html.match(
        /<meta[^>]+content=["']([^"']*)["'][^>]+property=["']og:image["']/i,
      )?.[1];

    return {
      title: decodeEntities(title?.trim() || fallback.title),
      description: decodeEntities(description?.trim() ?? ""),
      thumbnailUrl: toAbsoluteUrl(image ? decodeEntities(image.trim()) : "", url),
    };
  } catch {
    return fallback;
  }
}

// og:image가 상대 경로일 수 있어서 페이지 주소 기준으로 바꾼다.
function toAbsoluteUrl(src: string, base: URL) {
  if (!src) return undefined;
  try {
    return new URL(src, base).href;
  } catch {
    return undefined;
  }
}

function decodeEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'");
}
