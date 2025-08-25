import React from 'react';
import { ElementView } from '@elements/crud/CrudElement';

import { Mode } from '@lib/model/modeBase';
import { Toast } from 'primereact/toast';
import { useOutletContext } from 'react-router';
import type { User as UserBase } from 'model/User';

// Define the OutletContextType interface according to your context shape
interface OutletContextType {
  toast: React.RefObject<Toast>;
}

function CrudPage() {
  const [mode, setMode] = React.useState<Mode>('V');
  const [selectedUser, setSelectedUser] = React.useState<UserBase | null>(null);
  const { toast } = useOutletContext<OutletContextType>();

  return (
    <React.Fragment>
      {mode === 'V' && (
        <ElementView.ModeView mode={mode} setMode={setMode} toast={toast} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      )}
      {(mode === 'I' || mode === 'U') && (
        <ElementView.ModeSave mode={mode} setMode={setMode} toast={toast} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      )}
    </React.Fragment>
  );
}

export default CrudPage;
