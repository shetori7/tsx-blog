import Link from "next/link";
import React from "react";
import { getPageLink } from "../../lib/blog-helper";
import style from "@/styles/Pagenation.module.css";

interface Props {
	numberOfpage: number;
	tag: string;
}

const Pagenation = (props: Props) => {
	const { numberOfpage, tag } = props;

	let pages: number[] = [];
	for (let i = 1; i <= numberOfpage; i++) {
		pages.push(i);
	}

	return (
		<section>
			<ul className={style.pageList}>
				{pages.map((page) => (
					<li key={page} className={style.page}>
						<Link href={getPageLink(tag, page)} className={style.pageText}>
							{page}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};

export default Pagenation;
