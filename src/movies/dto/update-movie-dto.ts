import { PartialType } from "@nestjs/mapped-types";
import { CreateMovieDto } from "./create-movie.dto";
//import { IsNumber, IsString } from "class-validator";


// export class UpdateMovieDto { //필수 사항이 아닐 때 ?를 붙인다.
//     @IsString()
//     readonly title?: string;

//     @IsNumber()
//     readonly year?: number;

//     @IsString({ each: true })
//     readonly genres?: string[];
// }
export class UpdateMovieDto extends PartialType(CreateMovieDto) { }