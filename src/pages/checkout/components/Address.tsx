import { useDeleteAddressMutation} from "@/redux/features/address/addressApi";
import { toast } from "react-toastify";

interface AddressType {
  _id: string;
  phoneNumber: string;
  alternativePhoneNumber?: string;
  streetName: string;
  nearestLandMark: string;
  city: string;
  state: string;
  lgaOfResidence?: string;
  notes?: string;
}

interface AddressProps {
  addresses: AddressType[];
  isLoading: boolean;
  onEdit:(address) => void ;
  onSelect:(address) => void ;
  selectedAddress: AddressType | null;
}

const Address = ({ addresses, isLoading, onEdit, onSelect, selectedAddress }: AddressProps) => {
  const [deleteAddress] = useDeleteAddressMutation();

 

  if (isLoading) return <p>Loading addresses...</p>;
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold mb-2">Saved Addresses</h3>
      {addresses && addresses.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <ul className="flex flex-wrap gap-4">
            {addresses.map((address) => (
              <li
                onClick={() => onSelect(address)}
                key={address._id}
                className={`w-[300px] border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-sm space-y-2 flex flex-col justify-between cursor-pointer" ${
                  selectedAddress?._id === address._id
                    ? "border-blue-500" // Apply blue border if selected
                    : "border-gray-300" // Default border color
                }`}
              >
                <p>Phone Number: {address.phoneNumber}</p>
                <p>Alt Phone Number: {address.alternativePhoneNumber}</p>
                <p>Street Name: {address.streetName}</p>
                <p>Landmark: {address.nearestLandMark}</p>
                <p>City: {address.city}</p>
                <p>State: {address.state}</p>
                <p>LGA Of Residence: {address.lgaOfResidence}</p>
                <p>Notes: {address.notes}</p>
                <div className="flex justify-between mt-auto">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition" onClick={() => onEdit(address)}>
                    Edit
                  </button>
                  <button
                  onClick={async () => {
                    try {
                      await deleteAddress(address._id).unwrap();
                      toast.success("Address deleted");
                    } catch (err) {
                      toast.error("Failed to delete address");
                      console.error("Failed to delete address:", err);
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-500">No saved addresses found.</p>
      )}
    </div>
  );
};

export default Address;
