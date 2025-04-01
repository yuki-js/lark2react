import { Block } from './block';

export interface ApiResponse {
  data: {
    items: Array<
      Partial<Block> & {
        block_id?: string;
        block_type?: number;
        parent_id?: string;
      }
    >;
  };
}
