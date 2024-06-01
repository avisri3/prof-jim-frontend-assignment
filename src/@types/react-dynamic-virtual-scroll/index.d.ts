declare module 'react-dynamic-virtual-scroll' {
    interface DynamicVirtualScrollProps {
      dataLength: number;
      itemSize: number;
      loadMore: () => void;
      hasMore: boolean;
      height: number;
      isLoading: boolean;
      children: (props: { startIndex: number; endIndex: number }) => JSX.Element;
    }
  
    export default class DynamicVirtualScroll extends React.Component<DynamicVirtualScrollProps> {}
  }