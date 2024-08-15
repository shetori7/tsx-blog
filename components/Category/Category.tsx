import style from "@/styles/Category.module.css";
import Link from "next/link";
import React from "react";

type Props = {
	tags: string[];
};

const Category = (props: Props) => {
	const { tags } = props;

	return (
		<div>
			<section className={style.categorySearchBox}>
				<div className={style.categorySearchTitle}>カテゴリー</div>
				<ul>
					{tags.map((tag) => (
						<li key={tag}>
							<Link key={tag} href={`/posts/tag/${tag}/page/1`}>
								<span>{tag}</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default Category;
