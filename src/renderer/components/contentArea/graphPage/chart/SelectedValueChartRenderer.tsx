import {Line} from "recharts";

export interface SelectedValueChartLineProps {
    path: string;
}

export default function SelectedValueChartRenderer(props: SelectedValueChartLineProps) {
    //const [valuesOverTime] = useValuesOverTime(props.path);
    const valuesOverTime: number[] = []; // TODO: Fix me

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