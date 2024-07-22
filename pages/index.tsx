import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import Layouts, { siteTitle } from "@/components/Layouts";
import utilStyles from "../styles/utils.module.css"
import {getPostsData} from "../lib/post"


const inter = Inter({ subsets: ["latin"] });

//ssgの場合
export async function getStaticProps(){
  const allPostsData=getPostsData();

  return{
    props: {
      allPostsData,
    },
  };
}


export default function Home({ allPostsData }) {
  return(
    <Layouts home>
          <div className={styles.global}>
            <div className={styles.grid}>
              {allPostsData.map(({id,title,date,abstract})=>(
                <article key={id}  className={styles.article}>
                    <div>
                      <Link legacyBehavior href={`/posts/${id}`}>
                        <a className={utilStyles.boldText}>{title}</a>
                      </Link>
                    </div>
                    <div className={utilStyles.lightText}>
                      {date}
                    </div>
                    <div className={styles.abstract}>
                      {abstract}
                    </div>
                </article>
              ))}
            </div>
          </div>

    </Layouts>
  );
}
