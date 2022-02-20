import { Snackbar, SnackbarProps } from '@mui/material';
import React, { useState } from 'react';

interface IUiContext {
  showSnackbar: (config: SnackbarProps) => void;
}

export const UiContext = React.createContext<IUiContext>(null as any);

export default function UiProvider({ children }: { children: any }) {
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarProps>({
    open: false,
  });

  return (
    <UiContext.Provider
      value={{
        showSnackbar: setSnackbarConfig,
      }}
    >
      <Snackbar {...snackbarConfig} />
      {children}
    </UiContext.Provider>
  );
}

