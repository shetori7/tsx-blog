import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { NUMBER_OF_POSTS_PER_PAGE } from "../constants/constants";

const notion = new Client({
	auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getAllPosts = async () => {
	const posts = await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID,
		page_size: 100,
		filter:{
			property: "Published",
			checkbox: {
				equals: true
			}
		},
		sorts: [
			{
				property: "date",
				direction: "descending",
			},
		],
	});

	const allPosts = posts.results;
	return allPosts.map((post) => {
		return getPageMetaData(post);
	});
};

const getPageMetaData = (post) => {
	const getTags = (tags) => {
		const allTags = tags.map((tag) => {
			return tag.name;
		});
		return allTags;
	};

	return {
		id: post.id,
		title: post.properties.Name.title[0].plain_text,
		description: post.properties.Description.rich_text[0].plain_text,
		date: post.properties.date.date.start,
		slug: post.properties.slug.rich_text[0].plain_text,
		tags: getTags(post.properties.tag.multi_select),
	};
};

export const getSinglePost = async (slug) => {
	const response = await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID,
		filter: {
			property: "slug",
			formula: {
				string: {
					equals: slug,
				},
			},
		},
		page_size: 100,
	});

	const page = response.results[0];
	const metadata = getPageMetaData(page);

	const mdblocks = await n2m.pageToMarkdown(page.id);
	const mdString = n2m.toMarkdownString(mdblocks);

	return {
		metadata,
		markdown: mdString,
	};
};

// Topページ用記事の取得
export const getTopPosts = async (pageSize = 4) => {
	const allPosts = await getAllPosts();
	const topPosts = allPosts.slice(0, pageSize);

	return topPosts;
};

// ページ番号に応じた記事を取得
export const getPostsByPage = async (page: number) => {
	const allPosts = await getAllPosts();
	const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
	const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
	const posts = allPosts.slice(startIndex, endIndex);

	return posts;
};

export const getNumberOfPages = async () => {
	const allPosts = await getAllPosts();
	const numberOfPages =
		Math.floor(allPosts.length / NUMBER_OF_POSTS_PER_PAGE) +
		(allPosts.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0);
	return numberOfPages;
};

export const getPostsByTag = async (tagName: string, page: number) => {
	const allPosts = await getAllPosts();
	const postsByTag = allPosts.filter((post) => 
		post.tags.find((tag: string) => tag === tagName)
	);

	const startIndex = (page - 1) * NUMBER_OF_POSTS_PER_PAGE;
	const endIndex = startIndex + NUMBER_OF_POSTS_PER_PAGE;
	const posts = postsByTag.slice(startIndex, endIndex);
	return posts;

};

export const getNumberOfPagesByTag = async (tagName: string) => {
	const allPosts = await getAllPosts();
	const postsByTag = allPosts.filter((post) =>
		post.tags.find((tag: string) => tag === tagName)
	);
	const numberOfPages =
		Math.floor(postsByTag.length / NUMBER_OF_POSTS_PER_PAGE) +
		(postsByTag.length % NUMBER_OF_POSTS_PER_PAGE > 0 ? 1 : 0);
	return numberOfPages;
};

export const getAllTags = async () => {
	const allPosts = await getAllPosts();
	const allTags = allPosts.flatMap((post) => post.tags);
	const set =new Set(allTags);
	const uniqueTags =Array.from(set);
	return uniqueTags;
};