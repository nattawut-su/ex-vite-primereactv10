import { Outlet } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';

function rootLayout() {
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
  return (
    <div className="layout-wrapper">
      <div className="layout-menu-container">
        <Menubar model={items} />
      </div>
      <div className="layout-main">
        <Outlet />
      </div>
    </div>
  );
}

export default rootLayout;
