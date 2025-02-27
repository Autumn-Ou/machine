import { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "./Modal";
import { API_URL } from "@/lib/constants";
import { FaBolt, FaDollarSign, FaFire } from "react-icons/fa";
import { IconType } from "react-icons";
import router from "next/router";
import { ListingType } from "@/types/ListingType";
import { codes } from "currency-codes";

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const currencyOptions = ["USD", ""];
const Input = (props: {
  className?: string;
  placeholder: string;
  state?: (e: string) => void;
  icon: IconType;
}) => {
  return (
    <div className="relative w-full">
      <input
        className={`${props.className} w-full border border-[#2A2A2A] bg-card outline-none rounded-lg placeholder-lightGray text-lightGray px-3 py-[6px] text-sm pl-8`}
        type="text"
        placeholder={props.placeholder}
        spellCheck={false}
        onChange={(e) => props.state?.(e.target.value)}
      />
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <props.icon className="text-sm text-lightGray" />
      </span>
    </div>
  );
};

const ModalHeader = () => {
  return (
    <h1 className="font-semibold text-xl">
      Create a Listing <span className="text-primary">/ Marketplace</span>
    </h1>
  );
};

const ModalBody = (props: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [listingType, setListingType] = useState<ListingType>(
    ListingType.controller
  );
  const [currencyType, setCurrencyType] = useState("USD");

  const createListing = async () => {
    const data = {
      title: title,
      content: description,
      price: price,
      type: listingType,
      currencyType: currencyType,
    };

    await fetch(`${API_URL}/api/@me/post`, {
      method: "POST",
      body: JSON.stringify(data),
    }).then(() => router.reload());
  };

  return (
    <div className="mt-5">
      {errorMessage && (
        <div className="border border-[#2A2A2A] bg-card rounded-lg px-2 py-2 mt-[-5px] mb-5">
          <p className="text-red-500 text-xs">
            <b>ERROR:</b> {errorMessage}
          </p>
        </div>
      )}

      <div className="flex flex-col space-y-4">
        <div>
          <p className="uppercase text-xs text-lightGray mb-2">Listing Title</p>
          <div className="flex gap-x-2">
            <Input placeholder="Title" icon={FaFire} state={setTitle} />
          </div>
        </div>

        <div>
          <p className="uppercase text-xs text-lightGray mb-2">
            Listing Description
          </p>
          <div className="flex gap-x-2">
            <Input
              placeholder="Description"
              icon={FaBolt}
              state={setDescription}
            />
          </div>
        </div>
        <div>
          <div>
            <p className="uppercase text-xs text-lightGray mb-2">
              Listing Type
            </p>
            <div className="flex gap-x-2">
              <select
                className="w-full border border-[#2A2A2A] bg-card outline-none rounded-lg placeholder-lightGray text-lightGray px-3 py-[6px] text-sm pl-8"
                value={listingType}
                onChange={(e) => {
                  setListingType(e.target.value as ListingType);
                }}
              >
                {Object.entries(ListingType).map((type) => (
                  <option key={type[1]} value={type[0]}>
                    {type[1]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <p className="uppercase text-xs text-lightGray mb-2">Listing Price</p>
          <div className="flex gap-x-2">
            <Input placeholder="Price" icon={FaDollarSign} state={setPrice} />
          </div>
        </div>

        <div>
          <p className="uppercase text-xs text-lightGray mb-2">Currency Type</p>
          <div className="flex gap-x-2">
            <select
              className="w-full border border-[#2A2A2A] bg-card outline-none rounded-lg placeholder-lightGray text-lightGray px-3 py-[6px] text-sm pl-8"
              value={currencyType}
              onChange={(e) => setCurrencyType(e.target.value)}
            >
              {codes().map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          className="border border-[#2A2A2A] bg-card px-3 rounded-lg py-1 text-lightGray text-sm hover:border-gray-600"
          onClick={() => createListing()}
        >
          Create Listing
        </button>
      </div>
    </div>
  );
};

export const CreateListingModal = ({ isOpen, setOpen }: Props) => {
  return (
    <Modal
      header={<ModalHeader />}
      body={<ModalBody setOpen={setOpen} />}
      isOpen={isOpen}
      setOpen={setOpen}
    />
  );
};
