import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Card } from 'antd';
import { BackendTable } from 'src/_common/components/AttributeBackendTable/BackendTable';
import { setAddAttributeBackendTable } from 'src/_common/components/AttributeBackendTable/BackendTableSlice';
import { DragDropEditDrawer } from 'src/_common/components/DragDropEdit/DragDropEditDrawer';
import { EditDrawer } from 'src/_common/components/EditDrawer/EditDrawer';
import { HintTag } from 'src/_common/components/HintTag/HintTag';
import { useAppDispatch } from 'src/store/hooks/hooks';

/** Станица моделей данных (Backend). */
export const ModelPage = () => {
  const { pathname } = useLocation();
  const backendTableName = pathname.substring(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAddAttributeBackendTable({ backendTableName }));
  }, [dispatch, backendTableName]);

  return (
    <>
      <Card
        title={backendTableName}
        extra={<HintTag tagText="BACKEND MODEL" hintText="Модель данных предназначенная для Backend разработки" />}
      >
        <BackendTable />
      </Card>
      <EditDrawer />
      <DragDropEditDrawer />
    </>
  );
};
