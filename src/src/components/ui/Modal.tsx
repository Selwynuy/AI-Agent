import React from 'react';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  dismissible?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className = '',
  dismissible = true,
}) => {
  return (
    <Dialog
      open={open}
      handler={onClose}
      size={size}
      className={className}
      dismiss={{ enabled: dismissible }}
      placeholder=""
      onResize={undefined}
      onResizeCapture={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {title && (
        <DialogHeader 
          className="flex items-center justify-between" 
          placeholder=""
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          {dismissible && (
            <IconButton
              variant="text"
              color="gray"
              onClick={onClose}
              className="!absolute !top-3 !right-3"
              placeholder=""
              onResize={undefined}
              onResizeCapture={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <XMarkIcon className="h-5 w-5" />
            </IconButton>
          )}
        </DialogHeader>
      )}
      
      <DialogBody 
        className="overflow-y-auto" 
        placeholder=""
        onResize={undefined}
        onResizeCapture={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {children}
      </DialogBody>
      
      {footer && (
        <DialogFooter 
          className="space-x-2" 
          placeholder=""
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {footer}
        </DialogFooter>
      )}
    </Dialog>
  );
};

export default Modal; 