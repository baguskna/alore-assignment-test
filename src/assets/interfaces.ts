export interface SegmentSchema {
  title: string;
  titleIcon: string;
  segmentData: TableSchema[];
}

export interface TableSchema {
  icon: string;
  color: string;
  description: string;
}
