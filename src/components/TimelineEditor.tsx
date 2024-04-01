import { Timeline, TimelineRow } from "@xzdarcy/react-timeline-editor";
import { FC, useState } from "react";
import styled from "styled-components";
import { useEditorStore } from "../store";

const mockEffects = {
    effect0: {
        id: "effect-0",
        name: "效果0",
    },
    effect1: {
        id: "effect-1",
        name: "效果1",
    },
};

// const mockData = [
//     {
//         id: "0",
//         actions: [
//             {
//                 id: "action00",
//                 start: 0,
//                 end: 2,
//                 effectId: "effect0",
//             },
//         ],
//     },
//     {
//         id: "1",
//         actions: [
//             {
//                 id: "action10",
//                 start: 1.5,
//                 end: 5,
//                 effectId: "effect1",
//             },
//         ],
//     },
//     {
//         id: "2",
//         actions: [
//             {
//                 id: "action20",
//                 flexible: false,
//                 movable: false,
//                 start: 3,
//                 end: 4,
//                 effectId: "effect0",
//             },
//         ],
//     },
//     {
//         id: "3",
//         actions: [
//             {
//                 id: "action30",
//                 start: 4,
//                 end: 4.5,
//                 effectId: "effect1",
//             },
//             {
//                 id: "action31",
//                 start: 6,
//                 end: 8,
//                 effectId: "effect1",
//             },
//         ],
//     },
// ];

export const TimelineEditor: FC = () => {
    const timeline = useEditorStore((state) => state.timeline);
    const timelineData: TimelineRow[] = timeline.map((layer, index) => ({
        id: `${index}`,
        actions: [
            {
                id: `${index}`,
                start: layer.startTime,
                end: layer.endTime,
                effectId: `effect-${index}`,
            },
        ],
    }));
    const [data, setData] = useState(timelineData);

    return (
        <Container>
            <Layers>
                {data.map((item) => {
                    return (
                        <div key={item.id}>
                            <div className="text">{`Layer ${item.id}`}</div>
                        </div>
                    );
                })}
            </Layers>
            <Timeline
                editorData={data}
                effects={mockEffects}
                onChange={setData}
                autoScroll
                hideCursor={false}
            />
        </Container>
    );
};

const Container = styled.div`
    display: flex;

    & .timeline-editor {
        flex: 1;
    }

    & .timeline-editor-action {
        background-color: #3d348b;
        height: 28px !important;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const Layers = styled.div`
    padding-inline: 16px;
    padding-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 11px;
    background-color: #26292c;
    color: #fff;
    font-size: 14px;
`;
