import {Line} from "recharts";
import useNTValueHistoryFromPath from "../../../../hooks/networkTable/useNTValueHistoryFromPath.ts";

export interface SelectedValueChartLineProps {
    path: string;
}

export default function SelectedValueChartRenderer(props: SelectedValueChartLineProps) {
    const valueHistory = useNTValueHistoryFromPath(props.path);
    const values = valueHistory?.values;

    return (
        <Line
            type={"monotone"}
            name={props.path}
            dataKey={"value"}
            data={values}
            stroke={"#8884d8"}
            dot={false}
            isAnimationActive={false}
        />
    );
}