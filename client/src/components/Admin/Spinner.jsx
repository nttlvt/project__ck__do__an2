import {BounceLoader} from "react-spinners";

export default function Spinner({number}) {
  return (
    <BounceLoader color={'#1E3A8A'} speedMultiplier={number} />
  );
}