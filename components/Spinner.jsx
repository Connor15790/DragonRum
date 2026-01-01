export default function Spinner({ size = 24, color = "border-red-500" }) {
    return (
        <div
            className={`inline-block animate-spin rounded-full border-2 border-t-transparent ${color}`}
            style={{ width: size, height: size }}
        />
    );
}
