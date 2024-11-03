import { createBoard } from '@wixc3/react-board';
import { Avatar } from '~/src/components/avatar/avatar';

import styles from './avatar.board.module.scss';

const reactLogo = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSItMTAuNSAtOS40NSAyMSAxOC45IiBjb2xvcj0icmdiKDgsIDEyNiwgMTY0KSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjbGFzcz0idXd1LWhpZGRlbiBtdC00IG1iLTMgdGV4dC1icmFuZCBkYXJrOnRleHQtYnJhbmQtZGFyayB3LTI0IGxnOnctMjggc2VsZi1jZW50ZXIgdGV4dC1zbSBtZS0wIGZsZXggb3JpZ2luLWNlbnRlciB0cmFuc2l0aW9uLWFsbCBlYXNlLWluLW91dCI+CiAgPGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjIiIGZpbGw9ImN1cnJlbnRDb2xvciIvPgogIDxnIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjEwIiByeT0iNC41Ii8+CiAgICA8ZWxsaXBzZSByeD0iMTAiIHJ5PSI0LjUiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjEwIiByeT0iNC41IiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K`;

const coduxLogo = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDYwIDYwIj4KICA8cGF0aCBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00NC45OTYgMjAuMTE4YzAgMy44ODItLjY1NSA1LjA3NC0xLjQ5NiA2Ljg4MkM0OS44OTQgMjguMzQ2IDU0IDMzLjA4OCA1NCAzOS44ODIgNTQgNDcuNjggNDcuNjggNTQgMzkuODgyIDU0SDIwLjExOEMxMi4zMiA1NCA2IDQ3LjY4IDYgMzkuODgyIDYgMzMuMDg4IDEwLjEwNiAyOC4zNDcgMTYuNSAyN2MtLjg0MS0xLjgwOC0xLjQ4OC0zLTEuNDg4LTYuODgyQzE1LjAxMiAxMi4zMiAyMi4yMDIgNiAyOS45OTkgNnMxNC45OTcgNi4zMiAxNC45OTcgMTQuMTE4WiIgY2xpcC1ydWxlPSJldmVub2RkIi8+CiAgPHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMxLjY3MSAyMS40MzEgNS4wNjQgMi43N2MxLjAyLjU1OCAxLjAyIDIuMDQgMCAyLjU5OGwtNS4wNjQgMi43N2EzLjUwMyAzLjUwMyAwIDAgMS0zLjM3My0uMDA0bC01LjAzNi0yLjc2OGMtMS4wMTYtLjU1OC0xLjAxNi0yLjAzNiAwLTIuNTk0bDUuMDM2LTIuNzY4YTMuNTAzIDMuNTAzIDAgMCAxIDMuMzczLS4wMDRaIi8+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImEiIHgxPSI0Ni45NzUiIHgyPSIuMzg2IiB5MT0iNDcuMTY4IiB5Mj0iLjI4NyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4yMTQiIHN0b3AtY29sb3I9IiM0QjQ3RkYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMzlEQkIwIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KPC9zdmc+`;

export default createBoard({
    name: 'Avatar',
    Board: () => {
        return (
            <div className={styles.container}>
                <Avatar imageSrc={undefined} altText="unknown user avatar" />

                <Avatar imageSrc={coduxLogo} altText="Codux" />

                <Avatar imageSrc={reactLogo} altText="React" />
            </div>
        );
    },
    environmentProps: {
        windowWidth: 400,
        windowHeight: 100,
    },
});
