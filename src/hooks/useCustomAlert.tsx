import { useState } from 'react';

interface AlertState {
  visible: boolean;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info';
  onConfirm?: () => void;
  confirmText?: string;
  showCancel?: boolean;
  cancelText?: string;
}

export function useCustomAlert() {
  const [alert, setAlert] = useState<AlertState>({
    visible: false,
    title: '',
    message: '',
    type: 'info'
  });

  const showAlert = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'info' = 'info',
    onConfirm?: () => void,
    confirmText?: string,
    showCancel?: boolean,
    cancelText?: string
  ) => {
    setAlert({
      visible: true,
      title,
      message,
      type,
      onConfirm,
      confirmText,
      showCancel,
      cancelText
    });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, visible: false }));
  };

  const showSuccess = (title: string, message: string, onConfirm?: () => void) => {
    showAlert(title, message, 'success', onConfirm);
  };

  const showError = (title: string, message: string) => {
    showAlert(title, message, 'error');
  };

  const showInfo = (title: string, message: string, onConfirm?: () => void) => {
    showAlert(title, message, 'info', onConfirm);
  };

  return {
    alert,
    showAlert,
    hideAlert,
    showSuccess,
    showError,
    showInfo
  };
}
