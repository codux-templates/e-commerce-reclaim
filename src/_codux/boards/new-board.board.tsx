import './new-board.board.css';
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'New Board',
    Board: () => (
        <div>
            <h1 className="heading1">Heading 1</h1>
        </div>
    ),
    isSnippet: true,
});
