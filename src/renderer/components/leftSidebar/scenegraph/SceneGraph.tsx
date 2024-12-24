import {Box, List} from "@mui/material";
import useNTGroupInfoRoot from "../../../hooks/ntGroupInfo/useNTGroupInfoRoot.ts";
import SceneGraphGroup from "./SceneGraphGroup.tsx";
import NonIdealState from "../../common/NonIdealState.tsx";

export default function SceneGraph() {
    const rootInfo = useNTGroupInfoRoot();

    const hasChildren = rootInfo.children.length > 0;

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%"
            }}
        >
            {hasChildren ? (
                <List
                    sx={{
                        paddingLeft: 2,
                        paddingRight: 2,
                        marginTop: 2
                    }}
                >
                    {rootInfo.children.map((child) => (
                        <SceneGraphGroup
                            key={child.path}
                            groupInfo={child}
                            depth={1}
                        />
                    ))}
                </List>
            ) : (
                <NonIdealState
                    description={"No Network Table Data"}
                />
            )}
        </Box>
    );
}