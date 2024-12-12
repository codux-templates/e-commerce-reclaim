import { createBoard } from '@wixc3/react-board';
import { TestProduct } from '../../../src/components/test-product/test-product';

export default createBoard({
    name: 'TestProduct',
    Board: () => <TestProduct />,
});
