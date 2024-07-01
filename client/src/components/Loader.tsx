import { TailSpin, TailSpinProps } from "react-loader-spinner";

interface LoaderProps extends TailSpinProps {
  height: string;
  width: string;
}
export default function Loader({ height, width, ...rest }: LoaderProps) {
  return (
    <TailSpin
      visible={true}
      height={height}
      width={width}
      color="#E74694"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      {...rest}
    />
  );
}
