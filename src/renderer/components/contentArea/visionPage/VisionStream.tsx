import { Box } from "@mui/material";

interface VisionStreamProps {
    setImageError: (error: boolean) => void;
    setImageLoading: (loading: boolean) => void;
    streamUrl: string;
}

export default function VisionStream(
    { setImageError, setImageLoading, streamUrl }: VisionStreamProps
) {
    return <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            borderRadius: 2,
            overflow: "hidden",
        }}
    >
        <img
            src={streamUrl}
            alt="Vision Feed"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
            }}
            onError={() => setImageError(true)}
            onLoad={() => setImageLoading(false)}
            onLoadStart={() => setImageLoading(true)} />
    </Box>;
}