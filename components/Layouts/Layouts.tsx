import Head from "next/head";
import styles from "@/styles/layout.module.css";
import homeStyle from "@/styles/Home.module.css";
import utilStyles from "@/styles/utils.module.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import Nav from "../Nav/Nav";
import Category from "../Category/Category";

const name = "こうのとりの開発ブログ";
export const siteTitle = "こうのとりの開発ブログ";

function Layouts({ children, home, allTags }) {
	return (
		<div>
			<Head>
				<link
					href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
					rel="stylesheet"
				></link>
				<link rel="icon" href="/images/shetori_big.jpg"></link>
				<title>{siteTitle}</title>
				<meta name="description" content="実務の中で共有が必要だと思った技術課題、ITの基礎知識、資格試験の勉強方法まで幅広く解説するブログです。"/>
				<meta name="author" content="こうのとり" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="google-site-verification"
					content="jjXcm3S2ASguoeU-Jq_7hF_GuUkj_3b6BxU58KibHJA"
				/>
			</Head>
			<Analytics />
			<header className={styles.header}>
				<Link href={`/`}>
					<img
						src="/images/shetori.jpg"
						className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
					></img>
				</Link>
				<h1 className={`${utilStyles.headingXl} ${homeStyle.sitetitle}`}>
					{name}
				</h1>
				<Nav></Nav>
			</header>
			<main>
				<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
					<div className={homeStyle.maincontents}>
						{children}
						<div className={homeStyle.sidebar}>
							<div className={homeStyle.bio}>
								<div className={homeStyle.icon}>
									<Link href="/profile/profile">
										<img
											src="/images/shetori.jpg"
											className={homeStyle.sideBarImage}
										></img>
									</Link>
								</div>
								<div className={homeStyle.sidebarMessage}>
									都内SIer勤務SE。フロントエンドからインフラまで幅広く勉強中。得意な言語はNext.js,C#。			
								</div>
							</div>
							<Category tags={allTags}></Category>
						</div>
					</div>
				</section>
			</main>
			<footer className={styles.footer}>
				© 2024 konotori
			</footer>
		</div>
	);
}

export default Layouts;
