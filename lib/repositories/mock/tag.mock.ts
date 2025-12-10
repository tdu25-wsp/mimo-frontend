import { getMockTags } from "@/lib/converters";
import { ITagRepository } from "../interfaces/tag.interface";
import { Tag } from "@/types/tag";

let mockTags: Tag[] = [];
let isInitialized = false;

const initializeMockData = () => {
  if (!isInitialized) {
    mockTags = getMockTags();
    isInitialized = true;
  }
};

export const tagMockRepository: ITagRepository = {
  getAll: async (): Promise<Tag[]> => {
    initializeMockData();
    return [...mockTags];
  },

  create: async (name: string, color?: string): Promise<Tag> => {
    initializeMockData();
    
    const now = new Date().toISOString();
    const newTag: Tag = {
      id: `tag-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      userId: "mock-user-id",
      name,
      color: color || "#808080",
      createdAt: now,
      updatedAt: now,
    };
    
    mockTags.push(newTag);
    return newTag;
  },

  update: async (id: string, name: string, color?: string): Promise<Tag> => {
    initializeMockData();
    
    const index = mockTags.findIndex((tag) => tag.id === id);
    if (index === -1) {
      throw new Error(`Tag with id ${id} not found`);
    }
    
    mockTags[index] = {
      ...mockTags[index],
      name,
      ...(color !== undefined && { color }),
      updatedAt: new Date().toISOString(),
    };
    
    return mockTags[index];
  },

  delete: async (id: string): Promise<void> => {
    initializeMockData();
    
    const index = mockTags.findIndex((tag) => tag.id === id);
    if (index === -1) {
      throw new Error(`Tag with id ${id} not found`);
    }
    
    mockTags = mockTags.filter((tag) => tag.id !== id);
  },
}