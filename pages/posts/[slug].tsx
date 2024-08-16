import Layout from "../../components/Layouts/Layouts";
import { getAllPosts, getAllTags, getSinglePost } from "@/lib/notionAPI";
import Link from "next/link";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vsDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import style from "../../styles/slug.module.css";

export async function getStaticPaths() {
	const allPosts = await getAllPosts();
	const paths = allPosts.map(({ slug }) => ({ params: { slug } }));

	return {
		paths,
		fallback: "blocking",
	};
}

export async function getStaticProps({ params }) {
	const post = await getSinglePost(params.slug);
	const allTags = await getAllTags();

	return {
		props: {
			post,
			allTags,
		},
		revalidate: 60 * 60 * 24,
	};
}

export default function Post({ post ,allTags}) {
	return (
		<Layout home={false} allTags={allTags}>
			<section className={style.container}>
				<div className={style.title}>{post.metadata.title}</div>
				<div className={style.titleBorder}></div>
				<div className={style.date}>
					<span>Postes date at {post.metadata.date}</span>
				</div>
				<div className={style.tagList}>
					{post.metadata.tags.map((tag: string, index: number) => (
						<p key={index} className={style.tag}>
							<Link  href={`/posts/tag/${tag}/page/1`} className={style.tagText}>
								{tag}
							</Link>
						</p>
					))}
				</div>

				<div className={style.description}>
					<Markdown
						components={{
							code(props) {
								const { children, className, node, ...rest } = props;
								const match = /language-(\w+)/.exec(className || "");
								return match ? (
									<SyntaxHighlighter
										{...rest}
										PreTag="div"
										language={match[1]}
										style={vsDarkPlus}
									>
										{String(children).replace(/\n$/, "")}
									</SyntaxHighlighter>
								) : (
									<code>{children}</code>
								);
							},
						}}
					>
						{post.markdown.parent}
					</Markdown>
					<Link href={"/"}>
						<span className={style.home}>ホームへ戻る</span>
					</Link>
				</div>
			</section>
		</Layout>
	);
}
