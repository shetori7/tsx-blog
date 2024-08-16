import styles from "@/styles/Nav.module.css";
import Link from "next/link";


function Nav() {
    return (
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
                <Link className={styles.nav__link} href="/profile/profile">
                    プロフィール
                </Link>
            </li>
        </ul>
    </nav>
    );
}

export default Nav;