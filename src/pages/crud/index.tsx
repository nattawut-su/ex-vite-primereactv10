import React from 'react';
import { ElementView } from '@elements/crud/CrudElement';

import { Mode } from '@lib/model/modeBase';

function CrudPage() {
  const [mode, setMode] = React.useState<Mode>('V');

  return (
    <React.Fragment>
      {mode === 'V' && ElementView.getModeView({ mode, setMode })}
      {(mode === 'I' || mode === 'U') && ElementView.getModeSave({ mode, setMode })}
    </React.Fragment>
  );
}

export default CrudPage;
