import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(private readonly personRepository: PersonRepository) {}
  
  async findAll() {
    return this.personRepository.findAll();
  }

  async findOne(id: number) {
    const person = await this.personRepository.findOne(id);
    if (!person) {
      throw new NotFoundException('Message not found');
    }

    return person;
  }

  async create(createPersonDto: CreatePersonDto) {
    try {
      const newPerson = {
        name: createPersonDto.name,
        passwordHash: createPersonDto.password,
        email: createPersonDto.email,
      };

      return this.personRepository.create(newPerson);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('E-mail already registered');
      }
      throw error;
    }
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const updatePerson = {
      name: updatePersonDto.name,
      passwordHash: updatePersonDto.password,
    };

    return this.personRepository.update(id, updatePerson);
  }

  async remove(id: number) {
    const deleted = await this.personRepository.remove(id);
    if (!deleted) {
      throw new NotFoundException('Person not found');
    }

    return { success: true };
  }
}
