// src/core/useCases/ProcessMessageService.ts
import { UrlRepository } from "../interfaces/UrlRepository";
import { UrlDto } from "../dtos/UrlDto";
import { Logger } from "../../infrastructure/utils/Logger";

class ProcessMessageService {
  private urlRepository: UrlRepository;

  // Dependency injection via constructor
  constructor(urlRepository: UrlRepository) {
    this.urlRepository = urlRepository;
  }

  async process(message: any): Promise<void> {
    try {
      const urlDto = this.mapToDto(message);
      await this.saveUrlMapping(urlDto);
    } catch (error) {
      Logger.error("Error processing message", error);
    }
  }

  private mapToDto(message: any): UrlDto {
    return {
      originalUrl: message.originalUrl,
      shortUrl: message.shortUrl,
    };
  }

  private async saveUrlMapping(urlDto: UrlDto): Promise<void> {
    const urlMapping = {
      ...urlDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.urlRepository.insertUrlMapping(urlMapping);
  }
}

export { ProcessMessageService };
