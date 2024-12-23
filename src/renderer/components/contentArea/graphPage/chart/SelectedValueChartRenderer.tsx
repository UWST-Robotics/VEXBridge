import {Line} from "recharts";
import useValuesOverTime from "../../../../hooks/valueOverTime/useValuesOverTime.ts";

export interface SelectedValueChartLineProps {
    path: string;
}

export default function SelectedValueChartRenderer(props: SelectedValueChartLineProps) {
    const [valuesOverTime] = useValuesOverTime(props.path);

    return (
        <Line
            type={"monotone"}
            name={props.path}
            dataKey={"value"}
            data={valuesOverTime}
            stroke={"#8884d8"}
            dot={false}
            isAnimationActive={false}
        />
    );
}