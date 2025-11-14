"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFormModal } from "@/redux/slices/modalSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import type { ReactNode, HTMLAttributes } from "react";
import clsx from "clsx";

type TailwindClass = string & {};

type ReusableDialogProps = {
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  contentClassName?: TailwindClass;
  wrapperClassName?: TailwindClass;
  headerClassName?: TailwindClass;
  titleClassName?: TailwindClass;
  bodyClassName?: TailwindClass;
  footerClassName?: TailwindClass;
  closeButtonClassName?: TailwindClass;
  /** Extra HTML props for each part */
  contentProps?: HTMLAttributes<HTMLDivElement>;
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  headerProps?: HTMLAttributes<HTMLDivElement>;
  titleProps?: HTMLAttributes<HTMLHeadingElement>;
  bodyProps?: HTMLAttributes<HTMLDivElement>;
  footerProps?: HTMLAttributes<HTMLDivElement>;
  closeButtonProps?: HTMLAttributes<HTMLButtonElement>;
};

export const ModalDisplay = ({
  title,
  children,
  footer,
  contentClassName,
  wrapperClassName,
  headerClassName,
  titleClassName,
  bodyClassName,
  footerClassName,
  closeButtonClassName,
  contentProps = {},
  wrapperProps = {},
  headerProps = {},
  titleProps = {},
  bodyProps = {},
  footerProps = {},
  closeButtonProps = {},
}: ReusableDialogProps) => {
  const dispatch = useAppDispatch();
  const { isOpen, size = "md" } = useAppSelector(
    (state) => state.modal.formModal
  );

  const onClose = () => {
    dispatch(setFormModal({ isOpen: false, type: "", data: null }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className={clsx(contentClassName || `max-w-${size} w-full max-md:w-sm`)}
        {...contentProps}
      >
        <div className={clsx(wrapperClassName || "")} {...wrapperProps}>
          <DialogHeader
            className={clsx(headerClassName || "")}
            {...headerProps}
          >
            <DialogTitle
              className={clsx(titleClassName || "text-xl font-semibold")}
              {...titleProps}
            >
              {title}
            </DialogTitle>
            <DialogClose
              className={clsx(
                closeButtonClassName || "text-gray-500 hover:text-gray-700"
              )}
              onClick={onClose}
              {...closeButtonProps}
            />
          </DialogHeader>
          <div
            className={clsx(
              bodyClassName ||
                "mt-4 max-h-[75vh] overflow-y-auto scrollbar-thin"
            )}
            {...bodyProps}
          >
            {children}
          </div>
          {footer && (
            <DialogFooter
              className={clsx(footerClassName || "mt-4 flex justify-end gap-2")}
              {...footerProps}
            >
              {footer}
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
