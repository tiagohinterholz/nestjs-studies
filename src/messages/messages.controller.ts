import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  //UsePipes,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
//import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { TimingConnectionInterceptor } from 'src/common/interceptors/timming-connection.interceptor';
import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';
//import { ChangedDataInterceptor } from 'src/common/interceptors/changed-data.interceptor';
//import { SimpleCacheInterceptor } from 'src/common/interceptors/simple-cache.interceptor';
//import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';

//@UseInterceptors(ChangedDataInterceptor)
@Controller('messages')
//@UsePipes(ParseIntIdPipe) - usando de forma global no main
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  @UseInterceptors(TimingConnectionInterceptor, ErrorHandlingInterceptor)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.messagesService.findAll(paginationDto);
  }

  @Get(':id')
   @UseInterceptors(ErrorHandlingInterceptor)
  findOne(@Param('id') id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.messagesService.remove(id);
  }
}
