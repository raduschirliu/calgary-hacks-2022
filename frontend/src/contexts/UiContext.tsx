import { Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IUiContext {
  showSnackbar: (config: ISnackbarConfig) => void;
}

interface ISnackbarConfig {
  open: boolean;
}

const UiContext = React.createContext<IUiContext>(null as any);

export default function UiProvider({ children }: { children: any }) {
  const [snackbarConfig, setSnackbarConfig] = useState<ISnackbarConfig>({});

  return (
    <UiContext.Provider value={{}}>
      <Snackbar />
      {children}
    </UiContext.Provider>
  );
}
