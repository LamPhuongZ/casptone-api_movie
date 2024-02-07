import { ApiProperty } from '@nestjs/swagger';

export class bookSticketDTO {
  @ApiProperty()
  movie_id: number;

  @ApiProperty()
  showing_times: Date;

  @ApiProperty()
  cinema_id: number;

  @ApiProperty()
  ticket_price: number;
}
