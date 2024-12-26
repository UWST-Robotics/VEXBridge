import {CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis} from "recharts";
import useCurrentTime from "../../../../hooks/common/useCurrentTime.ts";
import useMaxTimeWindow from "../../../../hooks/graph/useMaxTimeWindow.ts";
import useGraphValues from "../../../../hooks/graph/useGraphValues.ts";

export default function SelectedValuesChart() {
    const currentTime = useCurrentTime(30);
    const [maxTimeWindow] = useMaxTimeWindow();
    const graphValues = useGraphValues();

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
                    dataKey={"timestamp"}
                    type={"number"}
                    allowDataOverflow={true}
                    domain={[currentTime - maxTimeWindow, currentTime]}
                    tickFormatter={formatTime}
                />
                <Legend/>

                {/* History Line */}
                {graphValues.map((graphData) => (
                    <Line
                        key={graphData.path}
                        type={"stepAfter"}
                        name={graphData.path}
                        dataKey={"value"}
                        data={graphData.values}
                        stroke={graphData.color}
                        dot={false}
                        isAnimationActive={false}
                    />
                ))}

                {/* Current Line */}
                {graphValues.map((graphData) => (
                    <ReferenceLine
                        key={graphData.path}
                        y={graphData.value}
                        stroke={"#fff"}
                        strokeDasharray={"3 3"}
                        label={{
                            value: `${graphData.name}: ${graphData.value?.toFixed(2)}`,
                            position: "insideBottomRight"
                        }}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}