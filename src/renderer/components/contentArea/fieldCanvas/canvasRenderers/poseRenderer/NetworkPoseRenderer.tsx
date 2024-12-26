import NTGroupInfo from "../../../../../../types/nt/NTGroupInfo.ts";
import PoseRenderer from "./PoseRenderer.tsx";
import parseNetworkValueToNumber from "../../../../../utils/parseNetworkValueToNumber.ts";
import useNTValueFromPath from "../../../../../hooks/networkTable/useNTValueFromPath.ts";

export interface NetworkPoseRendererProps {
    poseGroup: NTGroupInfo;
}

export default function NetworkPoseRenderer(props: NetworkPoseRendererProps) {
    const {poseGroup} = props;
    const name = useNTValueFromPath(poseGroup.path + "/name");
    const color = useNTValueFromPath(poseGroup.path + "/color");
    const _x = useNTValueFromPath(poseGroup.path + "/x");
    const _y = useNTValueFromPath(poseGroup.path + "/y");
    const _angle = useNTValueFromPath(poseGroup.path + "/rotation");
    const _length = useNTValueFromPath(poseGroup.path + "/length");
    const _width = useNTValueFromPath(poseGroup.path + "/width");

    // Parse network values to numbers
    const x = parseNetworkValueToNumber(_x);
    const y = parseNetworkValueToNumber(_y);
    const angle = parseNetworkValueToNumber(_angle);
    const length = parseNetworkValueToNumber(_length);
    const width = parseNetworkValueToNumber(_width);

    return (
        <>
            <PoseRenderer
                label={name?.toString() ?? poseGroup.name}
                strokeColor={color?.toString()}
                x={x ?? 0}
                y={y ?? 0}
                angle={angle}
                length={length}
                width={width}
                opacity={0.1}
                disableLerp
            />
            <PoseRenderer
                label={name?.toString() ?? poseGroup.name}
                strokeColor={color?.toString()}
                x={x ?? 0}
                y={y ?? 0}
                angle={angle}
                length={length}
                width={width}
            />
        </>
    );
}