import {
	getAllTags,
	getNumberOfPagesByTag,
	getPostsByTag,
} from "../../../../../lib/notionAPI";
import SinglePost from "../../../../../components/Post/SinglePost";
import { GetStaticPaths, GetStaticProps } from "next";
import Pagenation from "../../../../../components/Pagenation/Pagenation";
import Tag from "../../../../../components/Tag/Tag";
import Layouts from "@/components/Layouts";
import style from "../../../../../styles/page.module.css";

export const getStaticPaths: GetStaticPaths = async () => {
	const allTags = await getAllTags();
	let params = [];

	await Promise.all(
		allTags.map((tag: string) => {
			return getNumberOfPagesByTag(tag).then((numberOfPagesByTag: number) => {
				for (let i = 1; i <= numberOfPagesByTag; i++) {
					params.push({ params: { tag: tag, page: i.toString() } });
				}
			});
		})
	);

	return {
		paths: params,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const currentPage: string = context.params?.page.toString();
	const currentTag: string = context.params?.tag.toString();
	const allTags = await getAllTags();

	const upperCaseCurrentTag =
		currentTag.charAt(0).toUpperCase() + currentTag.slice(1);
	const posts = await getPostsByTag(
		upperCaseCurrentTag,
		parseInt(currentPage, 10)
	);

	const numberOfPagesByTag = await getNumberOfPagesByTag(upperCaseCurrentTag);

	return {
		props: {
			posts,
			numberOfPagesByTag,
			currentTag,
			allTags,
		},
		revalidate: 60 * 60 * 24,
	};
};

const BlogPageList = ({ posts, numberOfPagesByTag, currentTag, allTags }) => {
	return (
		<Layouts>
			<div className={style.container}>
				<main >
					<section >
						{posts.map((post) => (
							<div key={post.title}>
								<SinglePost
									title={post.title}
									description={post.description}
									date={post.date}
									tags={post.tags}
									slug={post.slug}
									isPagonationPage={true}
								/>
							</div>
						))}
					</section>
					<Pagenation numberOfpage={numberOfPagesByTag} tag={currentTag} />
				</main>
			</div>
		</Layouts>
	);
};

export default BlogPageList;
