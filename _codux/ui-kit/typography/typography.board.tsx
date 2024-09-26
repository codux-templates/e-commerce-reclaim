import { createBoard, Variant } from '@wixc3/react-board';
import '../board-common.scss';

export default createBoard({
    name: 'Typography',
    Board: () => (
        <div className="uiKitContainer">
            <div className="uiKitHeader">
                <b>UI Kit</b> | Core Components
            </div>
            <h3 className="uiKitTitle">Sections</h3>

            <div className="uiKitSection">
                <div className="uiKitSectionTitle">Heading</div>
                <div className="uiKitItem">
                    <Variant name="Heading1">
                        <h1 className="heading1">Heading 1</h1>
                    </Variant>
                    <div className="uiKitItemDescription">
                        <b>--heading1:</b> Marcellus / 80px / 1
                    </div>
                </div>
                <div className="uiKitItem">
                    <Variant name="Heading2">
                        <h2 className="heading2">Heading 2</h2>
                    </Variant>
                    <div className="uiKitItemDescription">
                        <b>--heading2:</b> Marcellus / 55px / 1.1
                    </div>
                </div>
                <div className="uiKitItem">
                    <Variant name="Heading3">
                        <h3 className="heading3">Heading 3</h3>
                    </Variant>
                    <div className="uiKitItemDescription">
                        <b>--heading3:</b> Marcellus / 42px / 1.2
                    </div>
                </div>
                <div className="uiKitItem">
                    <Variant name="Heading4">
                        <h4 className="heading4">Heading 4</h4>
                    </Variant>
                    <div className="uiKitItemDescription">
                        <b>--heading4:</b> Marcellus / 40px / 1.2
                    </div>
                </div>
                <div className="uiKitItem">
                    <Variant name="Heading5">
                        <h5 className="heading5">Heading 5</h5>
                    </Variant>
                    <div className="uiKitItemDescription">
                        <b>--heading5:</b> Marcellus / 20px / 1.3
                    </div>
                </div>
                <div className="uiKitItem">
                    <Variant name="Heading6">
                        <h6 className="heading6">Heading 6</h6>
                    </Variant>
                    <div className="uiKitItemDescription">
                        <b>--heading6:</b> Figtree (400) / 20px / 1.4
                    </div>
                </div>
            </div>

            <div className="uiKitSection">
                <div className="uiKitSectionTitle">Paragraph</div>
                <div className="uiKitItem">
                    <Variant name="Paragraph1">
                        <div className="paragraph1">
                            We ignite opportunity by setting the world in motion. 0123456789
                        </div>
                    </Variant>
                    <div className="uiKitItemDescription">
                        <b>--paragraph1:</b> Figtree (400) / 16px / 1.5
                    </div>
                </div>
                <div className="uiKitItem">
                    <Variant name="Paragraph2">
                        <div className="paragraph2">
                            We ignite opportunity by setting the world in motion. 0123456789
                        </div>
                    </Variant>
                    <div className="uiKitItemDescription">
                        <b>--paragraph2:</b> Figtree (400) / 15px / 1.6
                    </div>
                </div>
                <div className="uiKitItem">
                    <Variant name="Paragraph3">
                        <div className="paragraph3">
                            We ignite opportunity by setting the world in motion. 0123456789
                        </div>
                    </Variant>
                    <div className="uiKitItemDescription">
                        <b>--paragraph3:</b> Figtree (400) / 14px / 1.6
                    </div>
                </div>
            </div>
        </div>
    ),
    environmentProps: {
        windowWidth: 416,
        windowHeight: 698,
    },
    isSnippet: true,
});
