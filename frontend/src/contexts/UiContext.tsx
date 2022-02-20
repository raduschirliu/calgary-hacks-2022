import { Snackbar, SnackbarProps } from '@mui/material';
import { unstable_createChainedFunction } from '@mui/utils';
import React, { useState } from 'react';

interface IUiContext {
  showSnackbar: (config: SnackbarProps) => void;
}

export const UiContext = React.createContext<IUiContext>(null as any);

export default function UiProvider({ children }: { children: any }) {
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarConfig, setSnackbarConfig] = useState<SnackbarProps>({});

  const showSnackbar = (props: SnackbarProps) => {
    setSnackbarConfig(props);
    setSnackbarOpen(true);
  };

  return (
    <UiContext.Provider
      value={{
        showSnackbar,
      }}
    >
      <Snackbar
        {...snackbarConfig}
        open={snackbarOpen}
        onClose={() => {
          setSnackbarOpen(false);
        }}
      />
      {children}
    </UiContext.Provider>
  );
}
