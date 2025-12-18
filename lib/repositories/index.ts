import { IAuthRepository } from "./interfaces/auth.interface";
import { IMemoRepository } from "./interfaces/memo.interface";
import { ISummaryRepository } from "./interfaces/summary.interface";
import { ITagRepository } from "./interfaces/tag.interface";
import { IUserRepository } from "./interfaces/user.interface";

// Mock実装
import { authMockRepository } from "./mock/auth.mock";
import { memoMockRepository } from "./mock/memo.mock";
import { summaryMockRepository } from "./mock/summary.mock";
import { tagMockRepository } from "./mock/tag.mock";
import { userMockRepository } from "./mock/user.mock";

// Live実装
import { memoLiveRepository } from "./live/memo.live";
import { tagLiveRepository } from "./live/tag.live";

// 環境変数で切り替え ( .env.local で設定 )
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

export const authRepository: IAuthRepository = authMockRepository;
export const memoRepository: IMemoRepository = useMock ? memoMockRepository : memoLiveRepository;
export const summaryRepository: ISummaryRepository = summaryMockRepository;
export const tagRepository: ITagRepository = useMock ? tagMockRepository : tagLiveRepository;
export const userRepository: IUserRepository = userMockRepository;