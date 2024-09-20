import type React from 'react';
import { useState } from 'react';

import { TreeSelect } from 'antd';
import { MODEL_DATA_TREE_SELECT } from 'src/_common/components/DragDropEdit/consts';

const TreeSelectStyle: React.CSSProperties = {
  width: 300,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: 'top',
};

interface IProps {
  onSelectChange: (value: string) => void;
}

export const FindModelTreeSelect: React.FC<IProps> = ({ onSelectChange }) => {
  const [value, setValue] = useState<string | undefined | null>(null);
  const handleSelectChange = (treeSelectValue: string) => {
    onSelectChange(treeSelectValue);
    setValue(null);
  };

  return (
    <TreeSelect
      placeholder="Выберите модель данных"
      size="small"
      showSearch
      allowClear
      treeLine
      style={TreeSelectStyle}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={MODEL_DATA_TREE_SELECT}
      onSelect={handleSelectChange}
      value={value}
    />
  );
};
