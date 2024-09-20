import { DatabaseOutlined, PieChartOutlined } from '@ant-design/icons';

import type React from 'react';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import type { MenuProps } from 'antd';
import { Layout, Menu, Typography } from 'antd';
import { ROUTES_MAP } from 'src/_common/routes/routesMap';
import { v4 as uuidv4 } from 'uuid';

import logoSmall from '../../assets/svg/logo-small.svg';
import logoSuperSmall from '../../assets/svg/logo-super-small.svg';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

/** Компонент главного лэйаута приложения. */
export const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(true);

  const items: MenuItem[] = [
    getItem(
      '',
      '1',
      <Link to={ROUTES_MAP.HOME}>
        {collapsed ? <img src={logoSuperSmall} width={28} /> : <img src={logoSmall} width={100} />}
      </Link>
    ),
    getItem(
      'Create form',
      uuidv4(),
      <Link to={ROUTES_MAP.CREATE_FORM}>
        <PieChartOutlined />
      </Link>
    ),
    getItem('Backend models', uuidv4(), <DatabaseOutlined />, [
      getItem(
        'taxAttributes',
        uuidv4(),
        <Link to={ROUTES_MAP.TAX_ATTRIBUTES}>
          <DatabaseOutlined />
        </Link>
      ),
      getItem(
        'escrowPaymentOperation',
        uuidv4(),
        <Link to={ROUTES_MAP.ESCROW_PAYMENT_OPERATION}>
          <DatabaseOutlined />
        </Link>
      ),
      getItem(
        'civilEscrowAgreementDeponent',
        uuidv4(),
        <Link to={ROUTES_MAP.CIVIL_ESCROW_AGREEMENT_DEPONENT}>
          <DatabaseOutlined />
        </Link>
      ),
      getItem(
        'civilEscrowAgreementBeneficiary',
        uuidv4(),
        <Link to={ROUTES_MAP.CIVIL_ESCROW_AGREEMENT_BENEFICIARY}>
          <DatabaseOutlined />
        </Link>
      ),
    ]),
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content style={{ margin: 16 }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          AT.SPES ©{new Date().getFullYear()} Created by{' '}
          <Typography.Link target="_blank" strong href="https://t.me/FrontBite" title="Telegram">
            FrontBite
          </Typography.Link>
        </Footer>
      </Layout>
    </Layout>
  );
};
