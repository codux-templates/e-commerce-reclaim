import { createBoard } from '@wixc3/react-board';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '~/src/components/dropdown-menu/dropdown-menu';

import styles from './dropdown-menu.board.module.scss';

export default createBoard({
    name: 'Dropdown Menu',
    Board: () => {
        return (
            <div className={styles.container}>
                <DropdownMenu trigger={<button>Open Dropdown Menu</button>}>
                    <DropdownMenuItem>Menu Item 1</DropdownMenuItem>
                    <DropdownMenuItem>Menu Item 2</DropdownMenuItem>
                    <DropdownMenuItem>Menu Item 3</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <span>Exit</span>
                    </DropdownMenuItem>
                </DropdownMenu>
            </div>
        );
    },
    environmentProps: {
        windowWidth: 400,
        windowHeight: 400,
    },
});
