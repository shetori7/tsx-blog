import Head from "next/head";
import styles from "./layout.module.css";
import homeStyle from "@/styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react"

const name = "こうのとりの開発ブログ";
export const siteTitle = "こうのとりの開発ブログ";

function Layouts({ children, home }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/images/shetori_big.jpg"></link>
        <title>{siteTitle}</title>
        <meta name="description" content="開発ブログ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Analytics />
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/shetori.jpg"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
            ></img>
            <h1 className={utilStyles.headingXl}>{name}</h1>
          </>
        ) : (
          <>
            <img
              src="/images/shetori.jpg"
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
            ></img>
            <h1 className={utilStyles.headingXl}>{name}</h1>
          </>
        )}
      </header>
      <main>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <div className={homeStyle.maincontents}>
            {children}
            <div className={homeStyle.sidebar}>
            <div className={homeStyle.bio}>
              <div className={homeStyle.icon}>
                <img src="/images/shetori.jpg" className={homeStyle.sideBarImage}></img>
              </div>
              <div className={homeStyle.sidebarMessage}>
                都内SIer勤務のSEです。未経験~中級者向けに< br/>
                わかりやすくIT技術解説をします。
              </div>
            </div>
          </div>    
        </div>
        </section>
      </main>
      {!home && (
        <div>
          <Link href="/">←ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layouts;
