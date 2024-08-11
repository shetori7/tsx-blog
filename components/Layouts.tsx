import Head from "next/head";
import styles from "./layout.module.css";
import homeStyle from "@/styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

const name = "こうのとりの開発ブログ";
export const siteTitle = "こうのとりの開発ブログ";

function Layouts({ children, home = false }) {
	return (
		<div>
			<Head>
				<link
					href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
					rel="stylesheet"
				></link>
				<link rel="icon" href="/images/shetori_big.jpg"></link>
				<title>{siteTitle}</title>
				<meta name="description" content="開発ブログ" />
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
				<nav className={styles.nav}>
					<ul className={styles.navList}>
						<li className={styles.nav__item}>
							<Link className={styles.nav__link} href="/">
								ホーム
							</Link>
						</li>
						<li className={styles.nav__item}>
							<Link className={styles.nav__link} href="/posts/page/1">
								記事一覧
							</Link>
						</li>
						<li className={styles.nav__item}>
							<Link className={styles.nav__link} href="/profile">
								プロフィール
							</Link>
						</li>
					</ul>
				</nav>
			</header>
			<main>
				<section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
					<div className={homeStyle.maincontents}>
						{children}
						<div className={homeStyle.sidebar}>
							<div className={homeStyle.bio}>
								<div className={homeStyle.icon}>
									<Link href="/profile">
									<img
										src="/images/shetori.jpg"
										className={homeStyle.sideBarImage}
									></img>
									</Link>

								</div>
								<div className={homeStyle.sidebarMessage}>
									都内SIer勤務のSEです。未経験~中級者向けに
									<br />
									わかりやすくIT技術解説をします。
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

export default Layouts;
