import {
	getAllTags,
	getNumberOfPagesByTag,
	getPostsByTag,
} from "@/lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import { GetStaticPaths, GetStaticProps } from "next";
import Pagenation from "@/components/Pagenation/Pagenation";
import Layouts from "@/components/Layouts/Layouts";
import style from "@/styles/page.module.css";
import utilStyles from "@/styles/utils.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

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
			upperCaseCurrentTag,
		},
		revalidate: 60 * 60 * 24,
	};
};

const BlogPageList = ({
	posts,
	numberOfPagesByTag,
	currentTag,
	allTags,
	upperCaseCurrentTag,
}) => {
	return (
		<Layouts home={false} allTags={allTags}>
			<div className={utilStyles.global}>
				<div className={utilStyles.pageTitleBox}>
					<span className={style.tagTitle}>{upperCaseCurrentTag}</span>
				</div>
				<main>
					<div className={utilStyles.grid}>
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
					</div>
					<Pagenation numberOfpage={numberOfPagesByTag} tag={currentTag} />
				</main>
			</div>
		</Layouts>
	);
};

export default BlogPageList;
