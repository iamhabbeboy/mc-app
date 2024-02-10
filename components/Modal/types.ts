export interface Props {
    children: React.ReactNode;
    size?: "default" | "medium" | "full";
}

export interface ImageSelectionProps {
    imageSelected?: File | null;
}