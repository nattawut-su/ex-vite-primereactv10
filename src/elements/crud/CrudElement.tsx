import { Button } from 'primereact/button';

import { Mode } from '@lib/model/modeBase';

type Props = {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
};

export const ElementView = {
  getModeView({ setMode }: Props) {
    return (
      <>
        <Button type="button" label="addData" onClick={() => setMode(Mode.INSERT)}></Button>
        <h1>WECOME +.+ CRUD view</h1>
      </>
    );
  },

  getModeSave({ mode, setMode }: Props) {
    return (
      <>
        <h1>WECOME +.+ CRUD insert / update [{mode}]</h1>
        <Button type="button" label="add/edit" onClick={() => setMode(Mode.VIEW)}></Button>
      </>
    );
  },
};
