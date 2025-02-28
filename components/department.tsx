import classNames from "classnames";
import { ReactNode } from "react";
interface DepartmentProps {
  children: ReactNode;
  size?: "small" | "medium" | "large";
}

export default function Department({ children, size }: DepartmentProps) {
  return (
    <>
      {children && (
        <p
          className={classNames(
            "bg-orange-700 text-center rounded-full bg-opacity-50 text-white px-2.5",
            {
              "text-xs": size === "small",
              "text-base": size === "medium",
              "text-lg !py-1": size === "large",
            }
          )}
        >
          {children}
        </p>
      )}
    </>
  );
}
