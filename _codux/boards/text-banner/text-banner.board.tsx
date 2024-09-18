import { createBoard } from '@wixc3/react-board';
import { TextBanner } from '~/components/text-banner/text-banner';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';

export default createBoard({
    name: 'TextBanner',
    Board: () => (
        <TextBanner
            title="Essential home collections for sustainable living"
            subtitle="Products of the highest standards"
        >
            <LabelWithArrow>Shop Collections</LabelWithArrow>
        </TextBanner>
    ),
    isSnippet: true,
    environmentProps: {
        windowHeight: 360,
    },
});
