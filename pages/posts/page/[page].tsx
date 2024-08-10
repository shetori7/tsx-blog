import {
	getAllTags,
	getNumberOfPages,
	getPostsByPage,
} from "../../../lib/notionAPI";
import SinglePost from "../../../components/Post/SinglePost";
import { GetStaticPaths, GetStaticProps } from "next";
import Pagenation from "../../../components/Pagenation/Pagenation";
import Tag from "../../../components/Tag/Tag";
import style from "../../../styles/page.module.css";
import Layouts from "@/components/Layouts";

export const getStaticPaths: GetStaticPaths = async () => {
	const numberOfPage = await getNumberOfPages();
	let params = [];
	for (let i = 1; i <= numberOfPage; i++) {
		params.push({ params: { page: i.toString() } });
	}
	return {
		paths: params,
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const numberOfPage = await getNumberOfPages();
	const currentPage = context.params?.page;
	const allTags = await getAllTags();
	const postsByPage = await getPostsByPage(
		parseInt(currentPage.toString(), 10)
	);
	return {
		props: {
			postsByPage,
			numberOfPage,
			allTags,
		},
		revalidate: 60 * 60 * 24,
	};
};

const BlogPageList = ({ postsByPage, numberOfPage, allTags }) => {
	return (
		<Layouts >
			<div className={style.container}>
				<section>
					{postsByPage.map((post) => (
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
				<Pagenation numberOfpage={numberOfPage} tag={""} />
			</div>
		</Layouts>
	);
};

export default BlogPageList;
