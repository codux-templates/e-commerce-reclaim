import styles from './about-us.module.scss';

export default function AboutUsPage() {
    return (
        <div className={styles.root}>
            <div className={styles.aboutSection}>
                <h1 className={styles.header1}>We are ReClaim</h1>
                <p className={styles.header2}>A women-owned local business</p>
                <p className={styles.description}>
                    This is the space to introduce visitors to the business or brand. Briefly
                    explain who&#39;s behind it, what it does and what makes it unique. Share its
                    core values and what this site has to offer.
                </p>
            </div>
            <img
                className={styles.image}
                src="https://static.wixstatic.com/media/c837a6_825d7dbd2e634114906169b9674b56fa~mv2.jpg"
                alt=""
            />
        </div>
    );
}
