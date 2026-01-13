import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonRepository {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async findAll() {
    return await this.personRepository.find({
      order: {
        id: 'desc',
      },
    });
  }

  async findOne(id: number): Promise<Person | null> {
    return this.personRepository.findOne({
      where: { id },
    });
  }

  async create(dataPerson: Partial<Person>): Promise<Person> {
    const newPerson = this.personRepository.create(dataPerson);
    return this.personRepository.save(newPerson);
  }

  async update(id: number, dataPerson: Partial<Person>): Promise<Person> {
    const person = await this.personRepository.preload({
      id,
      ...dataPerson,
    });

    if (!person) {
      throw new NotFoundException('Person not found');
    }

    return this.personRepository.save(person);
  }

  async remove(id: number) {
    const result = await this.personRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
