import React from 'react';
import { AutoSizer, List, ListRowProps } from 'react-virtualized';

type VirtualizedListProps = {
  items: any;
  renderItem: (item: {}) => React.JSX.Element;
};

const VirtualizedList: React.FC<VirtualizedListProps> = ({ items, renderItem }) => {

  const rowRenderer = (itemProps: ListRowProps) => {
    return renderItem(items?.[itemProps?.index]);
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          width={width}
          height={height}
          rowCount={items?.length}
          rowHeight={items?.length * 90} // Adjust based on the size of your rows
          rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  );
};

export default VirtualizedList;