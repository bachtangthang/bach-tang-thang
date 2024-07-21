import { IsNumber, IsString, ValidateNested } from 'class-validator';

class CreateBookDto {
  @IsString()
  public content: string;

  @IsString()
  public title: string;

  @IsString()
  public author: string;
}

export default CreateBookDto;