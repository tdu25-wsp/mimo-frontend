export {
    convertMemoFromDTO,
    convertMemosFromDTO,
} from './memo.converter';

import { convertMemosFromDTO } from './memo.converter';
import { MemoDTO } from '@/types/server/memo-dto';
import { Memo } from '@/types/memo';
import memosData from '@/public/data/memos.json';

/**
 * モックデータとしてのMemo配列を取得
 */
export function getMockMemos(): Memo[] {
    const dtos: MemoDTO[] = memosData.memos;
    return convertMemosFromDTO(dtos);
}