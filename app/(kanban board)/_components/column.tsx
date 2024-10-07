import { ReactNode } from "react";

interface ColumnProps {
  title: string;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  children: ReactNode;
}

const Column = ({ title, children, onDrop }: ColumnProps) => {
  return (
    <div
      className="bg-gray-100 rounded-lg shadow-md p-4 w-80 flex-1"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export default Column;
