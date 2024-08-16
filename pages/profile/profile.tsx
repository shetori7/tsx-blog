import { GetStaticProps } from "next";
import Layouts from "@/components/Layouts/Layouts";
import { getAllTags } from "@/lib/notionAPI";
import utilStyles from "@/styles/utils.module.css";
import style from "@/styles/Profile.module.css";

export const getStaticProps: GetStaticProps = async () => {
	const allTags = await getAllTags();
	return {
		props: {
			allTags,
		},
	};
};

const profile = ({ allTags }) => {
	return (
		<Layouts home={false} allTags={allTags}>
			<div className={utilStyles.global}>
				<div className={style.profTitle}>管理人プロフィール</div>
				<div className={style.profImageBox}>
					<img src="/images/shetori.jpg" className={style.profImage}></img>
				</div>
				<div className={style.profContents}>
					インターネットの海から当ブログを見つけて頂きありがとうございます。
					<br />
					<br />
					管理人のkonotoriと言います。
					<br />
					このページでは管理人のプロフィール、経歴などを書いていきます。
					<div className={style.profHeading}>プロフィール/経歴</div>
					<div className={style.profDescription}>
						年次：3年目
						<br />
						<br />
						会社：都内某SIer
						<br />
						<br />
						専攻：土木工学専攻
						<br />
						<br />
						趣味：ポーカー・ラジオ(オードリー/あのちゃん/キタ二タツヤ)
						<br />
						<br />
						土木工学というITと正反対の学科からSI企業に入社した謎の経歴の持ち主です。
					</div>
					<div className={style.profHeading}>資格</div>
					<ul>
						<li>基本情報技術者</li>
						<li>応用情報技術者</li>
						<li>Azure Fundamentals</li>
						<li>Azure Administrator Associate</li>
					</ul>
					<div className={style.profHeading}>技術</div>
					<ul>
						<li>フロントエンド：Next.js/TypeScript/JavaScript</li>
						<li>バックエンド：C#/Java(研修レベル)</li>
						<li>データベース:SQLServer</li>
						<li>インフラ:Azure(研修レベル)/AWS(研修レベル)</li>
						<li>その他：Git</li>
					</ul>
				</div>
			</div>
		</Layouts>
	);
};

export default profile;
