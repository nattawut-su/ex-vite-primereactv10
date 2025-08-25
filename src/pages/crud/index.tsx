import React from 'react';
import { ElementView } from '@elements/crud/CrudElement';

import { Mode } from '../../model/mode';

function CrudPage() {
  const [mode, setMode] = React.useState<Mode>('view');

  return (
    <React.Fragment>
      {mode === 'view' && ElementView.getModeView({ mode, setMode })}
      {(mode === 'create' || mode === 'edit') && ElementView.getModeSave({ mode, setMode })}
    </React.Fragment>
  );
}

export default CrudPage;
