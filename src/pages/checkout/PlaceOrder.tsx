import AddressForm from "./components/AddressForm";
import Address from "./components/Address";
import CartTotal from "./components/CartTotal";
import { useState } from "react";
import { useGetAddressesQuery } from "@/redux/features/address/addressApi";

const PlaceOrder = () => {
  const { data, isLoading, refetch } = useGetAddressesQuery({});
  const [editAddress, setEditAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null); 

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Order Summary</h2>
      </section>
      <section className="section__container mt-8">
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
          {/* ---------Left Side ---------- */}
          <div className="flex flex-col gap-4 w-full sm:max-w-[680px]">
            <div className="text-xl sm:text-2xl my-3">
              <div className="inline-flex gap-2 items-center mb-3">
                <p className="text-gray-500">
                  DELIVERY{" "}
                  <span className="text-gray-700 font-medium">INFORMATION</span>
                </p>
                <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Address 
               addresses={data?.addresses}
               isLoading={isLoading}
               onEdit={setEditAddress} 
               onSelect={handleSelectAddress} 
               selectedAddress={selectedAddress}
               />
              <AddressForm
              refetchAddresses={refetch}
              addressBeingEdited={editAddress}
              setEditAddress={setEditAddress} 
               />
            </div>
          </div>
          {/* ------Right side --------- */}
          <div className="mt-8">
            <div className="mt-8 min-w-60">
              <CartTotal selectedAddress={selectedAddress} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlaceOrder;
