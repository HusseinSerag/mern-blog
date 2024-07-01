import { createContext, ReactNode, useContext, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface Childrenable {
  children: ReactNode;
}

interface ModalProps extends Childrenable {}
interface ModalTriggerProps {
  name: string;
  render: (onClick: () => void) => JSX.Element;
}
interface ModalContentProps {
  open: string;
  render: (onClick: () => void) => JSX.Element;
  onClose?: () => void;
}
type ModalType = {
  ModalTrigger(props: ModalTriggerProps): JSX.Element;
  ModalContent(props: ModalContentProps): JSX.Element | null;
} & ((props: ModalProps) => JSX.Element);

interface ModalContextValue {
  trigger(name: string): void;
  name: string;
}

const ModalContext = createContext<ModalContextValue>({} as ModalContextValue);

const Modal: ModalType = function ({ children }: ModalProps) {
  const [name, setName] = useState("");
  function trigger(name: string) {
    setName((current) => (current === name ? "" : name));
  }

  return (
    <ModalContext.Provider
      value={{
        name,
        trigger,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

function ModalTrigger({ name, render }: ModalTriggerProps) {
  const { trigger } = useContext(ModalContext);
  function onClick() {
    trigger(name);
  }
  return render(onClick);
}
function ModalContent({ open, render, onClose }: ModalContentProps) {
  const { name, trigger } = useContext(ModalContext);
  function onClick() {
    trigger(open);
  }
  if (open === name)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 px-4">
        <div className="bg-secondary relative max-h-[500px] min-w-[300px] max-w-[600px] overflow-auto rounded-lg bg-white p-12 dark:bg-gray-900">
          <IoMdClose
            onClick={() => {
              onClick();

              onClose?.();
            }}
            className="absolute right-4 top-4 h-6 w-6 cursor-pointer hover:text-gray-600"
          />
          {render(onClick)}
        </div>
      </div>
    );
  return null;
}

Modal.ModalTrigger = ModalTrigger;
Modal.ModalContent = ModalContent;

export default Modal;

export function useModal() {
  return useContext(ModalContext);
}
