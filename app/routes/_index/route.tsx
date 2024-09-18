import styles from './index.module.scss';
import { CategoryLink } from '~/components/category-link/category-link';

export default function HomePage() {
    return (
        <div className={styles.rowOfCards}>
            <CategoryLink categorySlug="kitchen" className="cardZoom">
                <img
                    className="cardBackground"
                    src="https://static.wixstatic.com/media/c837a6_c05a03f48fbd49e7b5046d1b18c930eb~mv2.jpg/v1/fill/w_547,h_730,q_90/c837a6_c05a03f48fbd49e7b5046d1b18c930eb~mv2.jpg"
                    alt=""
                />
                <div className="cardTitle">Kitchen</div>
            </CategoryLink>
            <CategoryLink categorySlug="bath" className="cardZoom">
                <img
                    className="cardBackground"
                    src="https://static.wixstatic.com/media/c837a6_269f35d6ccff4321b7ed1e65c2835c61~mv2.jpg/v1/fill/w_548,h_730,q_90/c837a6_269f35d6ccff4321b7ed1e65c2835c61~mv2.jpg"
                    alt=""
                />
                <div className="cardTitle">Bath</div>
            </CategoryLink>
            <CategoryLink categorySlug="on-the-go" className="cardZoom">
                <img
                    className="cardBackground"
                    src="https://static.wixstatic.com/media/c837a6_d38d8d08196d477ba49efff880d5b918~mv2.jpg/v1/fill/w_547,h_730,q_90/c837a6_d38d8d08196d477ba49efff880d5b918~mv2.jpg"
                    alt=""
                />
                <div className="cardTitle">On the Go</div>
            </CategoryLink>
        </div>
    );
}
