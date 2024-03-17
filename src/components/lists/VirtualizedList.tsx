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
          overscanRowCount={0}
          rowCount={items?.length}
          rowHeight={height}
          rowRenderer={rowRenderer}
        />
      )}
    </AutoSizer>
  );
};

export default VirtualizedList;