import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty()
  id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly price_with_discount: number;

  @ApiProperty()
  readonly discount_percentage: number;

  @ApiProperty()
  readonly warranty: string;

  @ApiProperty()
  readonly available?: boolean;
}
