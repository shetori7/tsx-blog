import Link from "next/link";
import React from "react";
import styles from "../../styles/SinglePost.module.css";

type Props = {
	title: string;
	description: string;
	date: string;
	tags: string[];
	slug: string;
	isPagonationPage: boolean;
};

const SinglePost = (props: Props) => {
	const { title, description, date, tags, slug, isPagonationPage } = props;
	return (
		<>
			{isPagonationPage ? (
				<section>
					<div key={title}>
						<div className={styles.title}>
							<Link key={title} href={`/posts/${slug}`}>
								{title}
							</Link>
						</div>

						<div key={date} className={styles.date}>
							{date}
						</div>
						<div className={styles.tagList}>
							{tags.map((tag: string, index: number) => (
								<Link
									className={styles.tag}
									href={`/posts/tag/${tag}/page/1`}
									key={index}
								>
									<span className={styles.tagText}>{tag}</span>
								</Link>
							))}
						</div>
					</div>
					<p className={styles.description}>{description}</p>
				</section>
			) : (
				<section>
					<div key={title}>
						<div className={styles.title}>
							<Link key={title} href={`/posts/${slug}`}>
								{title}
							</Link>
						</div>
						<div key={date} className={styles.date}>
							{date}
						</div>
						<div className={styles.tagList}>
							{tags.map((tag: string, index: number) => (
								<Link
									className={styles.tag}
									href={`/posts/tag/${tag}/page/1`}
									key={index}
								>
									<span className={styles.tagText}>{tag}</span>
								</Link>
							))}
						</div>
					</div>
					<p className={styles.description}>{description}</p>
				</section>
			)}
		</>
	);
};

export default SinglePost;
