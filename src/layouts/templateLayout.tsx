import { Outlet } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

function RootLayout() {
  const items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      url: '/',
    },
    {
      label: 'CRUD',
      icon: 'pi pi-star',
      url: '/crud',
    },
  ];
  const toast = useRef<Toast>(null);
  return (
    <div className="layout-wrapper">
      <div className="layout-menu-container">
        <Menubar model={items} />
      </div>
      <div className="layout-main">
        <Toast ref={toast} />
        <Outlet context={{ toast }} />
      </div>
    </div>
  );
}

export default RootLayout;
