import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findAll(paginationDto?: PaginationDto) {
    const limit = paginationDto?.limit ?? 10;
    const offset = paginationDto?.offset ?? 0;

    return await this.messageRepository.find({
      take: limit,
      skip: offset,
      relations: ['from', 'to'],
      order: {
        id: 'desc',
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
  }

  async findOne(id: number): Promise<Message | null> {
    return this.messageRepository.findOne({
      where: { id },
      relations: ['from', 'to'],
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
  }

  async create(newMessage: Partial<Message>): Promise<Message> {
    const message = this.messageRepository.create(newMessage);
    return this.messageRepository.save(message);
  }

  async update(
    id: number,
    updateMessage: Partial<Message>,
  ): Promise<Message | null> {
    const partialMessage = {
      read: updateMessage?.read,
      text: updateMessage?.text,
    };
    const message = await this.messageRepository.preload({
      id,
      ...partialMessage,
    });
    if (!message) {
      return null;
    }

    return this.messageRepository.save(message);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.messageRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
