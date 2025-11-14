import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { BeatLoader } from "react-spinners";

interface LoaderProps {
  size?: number;
  color?: string;
}

export const CustomLoader: React.FC<LoaderProps> = ({
  size = 50,
  color = "#4CAF50",
}) => {
  const isOpen = useAppSelector((state) => state.modal.loader.status);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <BeatLoader size={size} color={color} />
    </div>
  );
};
