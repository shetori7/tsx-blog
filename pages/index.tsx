import { Inter } from "next/font/google";
import utilStyles from "@/styles/utils.module.css";
import styles from "@/styles/Home.module.css";
import Layouts from "@/components/Layouts/Layouts";
import { getAllTags, getTopPosts } from "@/lib/notionAPI";
import SinglePost from "@/components/Post/SinglePost";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

//ssgの場合
export async function getStaticProps() {
	const topPosts = await getTopPosts();
	const allTags = await getAllTags();

	return {
		props: {
			topPosts,
			allTags,
		},
	};
}

export default function Home({ topPosts, allTags }) {
	return (
		<Layouts home allTags={allTags}>
			<div className={styles.global}>
				<div className={utilStyles.pageTitleBox}>
					<span className={utilStyles.pageTitle}>最新の投稿</span>
					<span className={utilStyles.subPgaeTitle}>– New Posts –</span>
				</div>
				<div className={styles.grid}>
					{topPosts.map((post) => (
						<div className="mx-4" key={post.id}>
							<SinglePost
								title={post.title}
								description={post.description}
								date={post.date}
								tags={post.tags}
								slug={post.slug}
								isPagonationPage={false}
							/>
						</div>
					))}
				</div>
				<div className={styles.moreButtonBox}>
					<Link href={"/posts/page/1"} className={styles.moreButton}>
						もっと見る
					</Link>
				</div>
			</div>
		</Layouts>
	);
}
