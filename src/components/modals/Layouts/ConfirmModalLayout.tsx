import React, { useCallback } from "react";

import Button from "../../Button";

export type ConfirModalLayoutProps = {
  isOpen: boolean;
  disabled?: boolean;
  title: string;
  description: string;
  actionLabel: string;
  onClose: () => void;
  onSubmit: () => void;
};

const ConfirModalLayout: React.FunctionComponent<ConfirModalLayoutProps> = ({
  title,
  actionLabel,
  description,
  onClose,
  onSubmit,
  disabled,
  isOpen,
}) => {
  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [disabled, onClose]);

  if (!isOpen) return null;

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
      <div className="relative w-full lg:w-2/6 my-6 mx-auto lg:max-w-1xl h-full lg:h-auto ">
        <div className="h-full lg:h-auto border-0 rounded-lg relative flex flex-col w-full bg-black gap-4 outline-none focus:outline-none p-10">
          {/* content */}

          {/* header */}
          <h3 className="text-white font-semibold text-3xl">{title}</h3>
          {/* body */}
          <p className="relative  text-white">{description}</p>
          {/* footer */}
          <div className="flex flex-col gap-3 ">
            <Button
              disabled={disabled}
              label={actionLabel}
              onClick={handleSubmit}
              danger
              fullWidth
              large
            />

            <Button
              disabled={disabled}
              label="Cancel"
              onClick={handleClose}
              fullWidth
              large
              primary
              outline
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirModalLayout;
