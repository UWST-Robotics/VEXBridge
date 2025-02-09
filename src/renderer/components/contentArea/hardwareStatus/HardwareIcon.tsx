import {ChangeCircle, Expand, Lightbulb, Loop, Palette, Place, QuestionMark, Visibility} from "@mui/icons-material";

export interface HardwareIconProps {
    type: string | undefined;
}

export default function HardwareIcon(props: HardwareIconProps) {
    const type = props.type?.toLowerCase();

    if (type === "motor" ||
        type === "smartmotor")
        return <ChangeCircle/>;

    if (type === "pneumatic" ||
        type === "adipneumatic")
        return <Expand/>;

    if (type === "rotationsensor" ||
        type === "rotation" ||
        type === "encoder")
        return <Loop/>;

    if (type === "imu" ||
        type === "gyro" ||
        type === "inertial")
        return <Loop/>;

    if (type === "led" ||
        type === "light")
        return <Lightbulb/>;

    if (type === "optical")
        return <Visibility/>;

    if (type === "distance")
        return <Expand/>;

    if (type === "color")
        return <Palette/>;

    if (type === "gps")
        return <Place/>;

    return <QuestionMark/>;
}