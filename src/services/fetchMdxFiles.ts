import matter from "gray-matter";
import { supabase } from "@/lib/supabase";
import { extractHeadings } from "@/utils/extractHeadings";

export async function fetchMdxContent(slug: string) {
  try {
    if(!slug) {
      throw new Error("This post does not exist!")
    }
    const { data, error } = await supabase.storage.from("mdx-articles").download(`test.mdx`);
    // const { data, error } = await supabase.storage.getBucket("mdx-articles")

    console.log(data, error);
    if (error) {
      console.error("Error fetching MDX file:", JSON.stringify(error));
      return null;
    }

    const text = await data.text();
    const { content, data: frontmatter } = matter(text);

    const headings = extractHeadings(text)
    return { content, frontmatter, error, headings };
  } catch (error) {
    console.error("Unexpected error fetching MDX content:", error);
    return null;
  }
}
