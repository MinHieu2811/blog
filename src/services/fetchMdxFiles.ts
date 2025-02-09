import matter from "gray-matter";
import { supabase } from "@/lib/supabase";

export async function fetchMdxContent(slug: string) {
  try {
    const { data, error } = await supabase.storage.from("mdx-articles").download(`${slug}.mdx`);
    if (error) {
      console.error("Error fetching MDX file:", error);
      return null;
    }

    const text = await data.text();
    const { content, data: frontmatter } = matter(text);
    return { content, frontmatter };
  } catch (error) {
    console.error("Unexpected error fetching MDX content:", error);
    return null;
  }
}
