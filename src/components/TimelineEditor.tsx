import { Timeline } from "@xzdarcy/react-timeline-editor";
import { FC } from "react";

export const TimelineEditor: FC = () => {
    return (
        <Timeline
            style={{
                width: "auto",
            }}
            editorData={[]}
            effects={{}}
        />
    );
};
