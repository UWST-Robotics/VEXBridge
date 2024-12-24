import {CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from "recharts";
import useCurrentTime from "../../../../hooks/common/useCurrentTime.ts";

export default function SelectedValuesChart() {
    const currentTime = useCurrentTime(50);
    //const [maxTimeWindow] = useMaxTimeWindow();
    //const chartValues = useChartValues();
    // TODO: Fix me
    const maxTimeWindow = 0;
    const chartValues: {
        path: string;
        name: string;
        color: string;
        value: number;
        values: { time: number, value: number }[];
    }[] = [];

    // Time Functions
    const formatTime = (time: number) => {
        const diff = currentTime - time;
        const seconds = diff / 1000;
        return `-${seconds.toFixed(1)}s`;
    };

    return (
        <ResponsiveContainer
            width={"100%"}
            height={350}
        >
            <LineChart>
                {/* Grid */}
                <CartesianGrid strokeDasharray={"3 3"} stroke={"#222"}/>
                <YAxis
                    dataKey={"value"}
                    tickCount={10}
                    type={"number"}
                    tickFormatter={(value: number) => value.toFixed(2)}
                />
                <XAxis
                    dataKey={"time"}
                    type={"number"}
                    allowDataOverflow={true}
                    domain={[currentTime - maxTimeWindow, currentTime]}
                    tickFormatter={formatTime}
                />
                <Legend/>

                {/* Values over Time */}
                {chartValues.map((chartValue) => (
                    <>
                        <Line
                            type={"monotone"}
                            name={chartValue.path}
                            dataKey={"value"}
                            data={chartValue.values}
                            stroke={chartValue.color}
                            dot={false}
                            isAnimationActive={false}
                        />
                        <ReferenceLine
                            y={chartValue.value}
                            stroke={"#fff"}
                            strokeDasharray={"3 3"}
                            label={{
                                value: `${chartValue.name}: ${chartValue.value?.toFixed(2)}`,
                                position: "insideBottomRight"
                            }}
                        />
                    </>
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}