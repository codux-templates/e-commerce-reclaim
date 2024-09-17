import './typography.board.scss';
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Typography',
    Board: () => (
        <div>
            <h1 className="heading1">Heading 1</h1>
            <h2 className="heading2">Heading 2</h2>
            <h3 className="heading3">Heading 3</h3>
            <h4 className="heading4">Heading 4</h4>
            <h5 className="heading5">Heading 5</h5>
            <h6 className="heading6">Heading 6</h6>

            <p className="paragraph1">Paragraph 1</p>
            <p className="paragraph2">Paragraph 2</p>
            <p className="paragraph3">Paragraph 3</p>
        </div>
    ),
    isSnippet: true,
    environmentProps: {
        windowWidth: 449,
        windowHeight: 463,
    },
});
