import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './messages.repository';
import { PersonService } from 'src/person/person.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class MessagesService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly personService: PersonService,
  ) {}

  async findAll(paginationDto?: PaginationDto) {
    return this.messageRepository.findAll(paginationDto);
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne(id);
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async create(createMessageDto: CreateMessageDto) {
    const { fromId, toId } = createMessageDto;
    const from = await this.personService.findOne(fromId);
    const to = await this.personService.findOne(toId);

    const newMessage = {
      text: createMessageDto.text,
      from,
      to,
      createdAt: new Date(),
    };

    const message = await this.messageRepository.create(newMessage);
    return {
      ...message,
      from: {
        id: message.from.id,
        name: message.from.name,
      },
      to: {
        id: message.to.id,
        name: message.to.name,
      },
    };
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    await this.findOne(id);
    const updateMessage = await this.messageRepository.update(
      id,
      updateMessageDto,
    );
    return updateMessage;
  }

  async remove(id: number) {
    const deleted = await this.messageRepository.remove(id);

    if (!deleted) {
      throw new NotFoundException('Message not found');
    }

    return { success: true };
  }
}
