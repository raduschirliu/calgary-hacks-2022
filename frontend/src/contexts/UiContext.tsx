import { Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IUiContext {
  showSnackbar: (config: ISnackbarConfig) => void;
}

interface ISnackbarConfig {
  open: boolean;
  message: string;
  hideDuration?: number;
  onClose?: () => void;
  action?: () => void;
}

const UiContext = React.createContext<IUiContext>(null as any);

export default function UiProvider({ children }: { children: any }) {
  const [snackbarConfig, setSnackbarConfig] = useState<ISnackbarConfig>({
    open: false,
    message: '',
  });

  return (
    <UiContext.Provider
      value={{
        showSnackbar: setSnackbarConfig,
      }}
    >
      <Snackbar />
      {children}
    </UiContext.Provider>
  );
}
