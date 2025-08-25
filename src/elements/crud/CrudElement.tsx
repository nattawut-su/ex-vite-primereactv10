import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { Toast } from 'primereact/toast';

import { Mode } from '@lib/model/modeBase';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from '../../hooks/user/useUsersCrud';
import type { User as UserBase } from 'model/User';

type UserFormValues = Omit<UserBase, 'id'> & { id?: number };

interface ElementType {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  toast: React.RefObject<Toast>;
  selectedUser: UserBase | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<UserBase | null>>;
}

type Props = Readonly<ElementType>;

function ModeView({ setMode, setSelectedUser, toast }: Props) {
  const [q] = useState('');
  const { data } = useUsers(q);
  const deleteMut = useDeleteUser();

  const editUser = (user: UserBase) => {
    setSelectedUser(user);
    setMode(Mode.EDIT);
  };

  const confirmDelete = (user: UserBase) => {
    deleteMut.mutate(user.id);
    toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'user Deleted', life: 3000 });
  };

  const actionBodyTemplate = (rowData: UserBase) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editUser(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDelete(rowData)} />
      </React.Fragment>
    );
  };

  return (
    <>
      <Button type="button" label="addData" onClick={() => setMode(Mode.INSERT)}></Button>
      <h1>CRUD view</h1>
      <DataTable value={data} tableStyle={{ minWidth: '50rem' }}>
        <Column field="id" header="id"></Column>
        <Column field="name" header="name"></Column>
        <Column field="email" header="email"></Column>
        <Column body={actionBodyTemplate} header="actions"></Column>
      </DataTable>
    </>
  );
}

function ModeSave({ mode, setMode, toast, selectedUser }: Props) {
  const userSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(2),
    email: z.email(),
  });
  const createMut = useCreateUser();
  const updateMut = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: selectedUser ? { id: selectedUser.id, name: selectedUser.name, email: selectedUser.email } : { name: '', email: '' },
  });

  const onSubmit = (data: UserFormValues) => {
    console.log('Form data:', data);
    if (mode === 'I') {
      createMut.mutate(data);
      toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000 });
    } else if (typeof data.id === 'number') {
      updateMut.mutate({ id: data.id, input: { name: data.name, email: data.email } });
      toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'user Updated', life: 3000 });
    } else {
      console.error('User id is required for update');
      return;
    }
    setMode(Mode.VIEW);
  };

  const invalid = (key: keyof UserFormValues) => (errors[key] ? 'p-invalid' : '');

  return (
    <>
      <h1>insert / update [{mode}]</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputText {...register('name')} className={invalid('name')} />
        {errors.name && <Message severity="error" text={errors.name.message} />}
        <InputText {...register('email')} className={invalid('email')} />
        {errors.email && <Message severity="error" text={errors.email.message} />}
        <Button type="submit" label="save"></Button>
      </form>
    </>
  );
}

export const ElementView = {
  ModeView,
  ModeSave,
};
