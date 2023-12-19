import PropTypes from "prop-types";
import { format } from "date-fns";

export const OrdersCard = ({ totalPrice, createdAt }) => {
  return (
    <div className="flex justify-between items-center mb-3 p-4 w-80 border-bottom">
      <div className="flex justify-between w-full">
        <p className="flex flex-col">
          <span>Date: {format(new Date(createdAt), "dd/MM/yyyy")}</span>
          <span>
            {format(new Date(createdAt), "hh:MM")}{" "}
            {new Date(createdAt).getHours() >= 12 ? "PM" : "AM"}
          </span>
        </p>
        <p>
          Total: <span className="text-lg font-medium">{totalPrice}</span>
        </p>
      </div>
    </div>
  );
};

OrdersCard.propTypes = {
  totalPrice: PropTypes.number,
  createdAt: PropTypes.string,
};
