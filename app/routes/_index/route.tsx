import { HeroImage } from '~/components/hero-image/hero-image';

export default function HomePage() {
    return (
        <>
            <HeroImage
                subTitle="ReClaim"
                title="Reuse. Repurpose. Relove."
                linkLabel="Shop Collections"
                linkCategorySlug="all-products"
            />
            <p>Home page</p>
        </>
    );
}
