// import DashboardLayout from "@/app/dashboard/page";
import styles from "./index.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main} >
      <div className={styles.container}>
        <div className={styles.showcaseContainer}>
          <div className={styles.authContainer}>
            <Link
              href={"/dashboard"}
              className={styles.loginButton}
            >
              {"Loading"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}