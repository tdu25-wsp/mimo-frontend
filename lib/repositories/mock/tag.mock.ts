import { getMockTags } from "@/lib/converters";
import { ITagRepository } from "../interfaces/tag.interface";
import { Tag } from "@/types/tag";
import { CreateTagDTO } from "@/types/server/create-tag-dto";
import { UpdateTagDTO } from "@/types/server/update-tag-dto";

let mockTags: Tag[] = [];
let isInitialized = false;

const initializeMockData = () => {
  if (!isInitialized) {
    mockTags = getMockTags();
    isInitialized = true;
  }
};

export const tagMockRepository: ITagRepository = {
  getAll: async (userId?: string): Promise<Tag[]> => {
    initializeMockData();
    if (userId) {
      return mockTags.filter((tag) => tag.userId === userId);
    }
    return [...mockTags];
  },

  create: async (userId: string, data: CreateTagDTO): Promise<Tag> => {
    initializeMockData();

    const now = new Date().toISOString();
    const newTag: Tag = {
      id: `tag-${Date.now().toString()}`,
      userId: userId,
      name: data.name,
      color: data.color_code || "#64748B",
      createdAt: now,
      updatedAt: now,
    };

    return newTag;
  },

  update: async (data: UpdateTagDTO): Promise<Tag> => {
    initializeMockData();

    const index = mockTags.findIndex((tag) => tag.id === data.tagId);
    if (index === -1) {
      throw new Error(`Tag with id ${data.tagId} not found`);
    }

    const updateTag: Tag = {
      ...mockTags[index],
      name: data.name,
      color: data.colorCode,
      updatedAt: new Date().toISOString(),
    };

    mockTags[index] = updateTag;

    return updateTag;
  },

  delete: async (id: string): Promise<void> => {
    initializeMockData();

    const index = mockTags.findIndex((tag) => tag.id === id);
    if (index === -1) {
      throw new Error(`Tag with id ${id} not found`);
    }

    mockTags = mockTags.filter((tag) => tag.id !== id);
  },
};
