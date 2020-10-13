import React from "react";

type GroupProps = {
  top?: number;
  left?: number;
  transform?: string;
  className?: string;
  children?: React.ReactNode;
  innerRef?: React.Ref<SVGGElement>;
};

function Group({
  top = 0,
  left = 0,
  transform,
  className,
  children,
  innerRef,
  ...restProps
}: GroupProps & Omit<React.SVGProps<SVGGElement>, keyof GroupProps>) {
  return (
    <g
      ref={innerRef}
      className={className}
      transform={transform || `translate(${left}, ${top})`}
      {...restProps}
    >
      {children}
    </g>
  );
}

export { Group };
