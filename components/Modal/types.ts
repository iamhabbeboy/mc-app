export interface Props {
    children: React.ReactNode;
    size?: "default" | "medium" | "full";
    className?: string;
}

export interface ImageSelectionProps {
    imageSelected?: File | null;
}